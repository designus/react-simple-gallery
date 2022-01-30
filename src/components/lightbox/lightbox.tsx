import React, { MouseEvent, useState, useEffect, useRef, MutableRefObject, createRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Arrow } from './arrow';
import { GalleryImage, TransitionAnimation, RenderImage, Direction } from '../types';
import CloseIcon from './close-icon.svg?component';

import './lightbox.css';
  
interface Props<T> {
  onClose: VoidFunction;
  images: GalleryImage<T>[];
  activeIndex?: number;
  animation?: TransitionAnimation;
  renderFullImage: RenderImage<T>;
}

const transitionTimeoutLookup: Record<TransitionAnimation, number> = {
  fade: 300,
  slide: 500,
  none: 0
}
  
export function Lightbox<T>(props: Props<T>) {
  const { animation = 'slide', renderFullImage } = props;
  const [activeIndex, setActiveIndex] = useState(props.activeIndex ?? 0);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const imageRefs: MutableRefObject<null | HTMLDivElement>[] = props.images.map(image => createRef());  
  const [direction, setDirection] = useState<Direction>('right')

  const prevIndex = (activeIndex + props.images.length - 1) % props.images.length;
  const nextIndex = (activeIndex + props.images.length + 1) % props.images.length;

  const initialAnimateArrow = useRef<Record<Direction, boolean>>({
    left: false,
    right: false
  });

  const [animateArrow, setAnimateArrow] = useState(initialAnimateArrow.current);

  useEffect(() => {
    setAnimateArrow(initialAnimateArrow.current);
  }, [activeIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.focus();
    }
  }, [containerRef]);


  useEffect(() => {
    setActiveIndex(props.activeIndex ?? 0);
  }, [props.activeIndex]);

  const hasSomeImagesTitle = props.images.some(image => Boolean(image.title));

  const getAnimationClassName = () => {
    if (animation === 'slide') {
      return `sg-slide-${direction}`;
    }
    
    if (animation === 'fade') {
      return 'sg-fade';
    }

    return '';
  };

  const handleMove = (newIndex: number, newDirection: Direction) => {
    setDirection(newDirection);
    setActiveIndex(newIndex);
    setAnimateArrow({
      left: newDirection === 'left',
      right: newDirection === 'right'
    })
  };

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = event.code;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].indexOf(keyCode) !== -1) {
      event.preventDefault();
    }

    if (keyCode === 'ArrowLeft') {
      handleMove(prevIndex, 'left');
    } else if (keyCode === 'ArrowRight') {
      handleMove(nextIndex, 'right');
    } else if (keyCode === 'Escape') {
      props.onClose();
    }
  };

  const renderArrows = () => props.images.length > 1 ? (
    <div className={`
      sg-text-white
      sg-h-full
      sg-relative
      sg-w-full
      sg-text-5xl
      sm:sg-text-6xl
      sg-flex
      sg-flex-col
      sg-justify-center
      sg-select-none
    `}>
      <Arrow
        className="sg-left-0 hover:before:sg-bg-gradient-to-r"
        direction="left"
        hasAdjustedPosition={hasSomeImagesTitle}
        onClick={() => handleMove(prevIndex, 'left')}
        animate={animateArrow.left}
      />
      <Arrow
        className="sg-right-0 hover:before:sg-bg-gradient-to-l"
        direction="right"
        hasAdjustedPosition={hasSomeImagesTitle}
        onClick={() => handleMove(nextIndex, 'right')}
        animate={animateArrow.right}
      />
    </div>
  ) : null;

  const renderClose = () => (
    <div
      role="button"
      tabIndex={0}
      aria-label="Close image button"
      onClick={props.onClose}
      className={`
        sg-absolute
        sg-z-20
        sg-right-10px
        sg-top-10px
        sg-flex
        sg-justify-center
        sg-items-center
        sg-bg-black
        sg-bg-opacity-30
        sg-rounded-full
        sg-cursor-pointer
      `}
    >
      <CloseIcon className={`
        sg-fill-white
        sg-w-10
        sg-h-10
        sg-mr-2px
        sm:sg-w-12
        sm:sg-h-12
      `}
      />
    </div>
  );

  const renderImageTitle = (image: GalleryImage<T>) => hasSomeImagesTitle && (
    <div className={`
      sg-text-white
      sg-text-center
      sg-select-none
      sg-min-h-50px
      sg-flex
      sg-flex-col
      sg-justify-center
      sg-text-base
    `}>
      {image.title}
    </div>
  );

  const renderModal = () => (
    <div
      role="dialog"
      tabIndex={-1}
      aria-label="Image modal"
      className={`
        sg-modal
        sg-fixed
        sg-top-0
        sg-bottom-0
        sg-left-0
        sg-right-0
        sg-h-screen
        sg-z-50
        sg-flex
        sg-justify-center
        sg-items-center
        sg-flex-col
        before:sg-absolute
        before:sg-top-0
        before:sg-bottom-0
        before:sg-left-0
        before:sg-right-0
        before:sg-h-screen
        before:-sg-z-10
        before:sg-bg-black
      `}
      onKeyDown={handleKeyDown}
      onMouseDown={handleClose}
      ref={containerRef}
    >
      <div className="sg-w-full sg-h-full sg-relative">
        {renderClose()}
        <TransitionGroup>
          {props.images.map((image, index) => {
            return index === activeIndex ? (
              <CSSTransition
                key={image.id ?? index}
                nodeRef={imageRefs[index]}
                timeout={transitionTimeoutLookup[animation]}
                classNames={getAnimationClassName()}
              >
                <div
                  ref={imageRefs[index]}
                  className={classNames(`
                    sg-image-wrapper
                    sg-absolute
                    sg-top-0
                    sg-left-0
                    sg-right-0
                    sg-bottom-0
                    sg-w-full
                    sg-m-auto
                    sg-flex
                    sg-flex-col
                    sg-justify-center
                    sg-items-center
                  `, {
                    ['sg-has-title']: Boolean(image.title)
                  })}
                >
                  <React.Fragment key="fullImage">
                    {renderFullImage(image)}
                  </React.Fragment>
                  {renderImageTitle(image)}
                </div>
              </CSSTransition>
            ) : null
          })}
        </TransitionGroup>
        {renderArrows()}
      </div>
    </div>
  );

  return createPortal(
    renderModal(),
    document.body
  );
};