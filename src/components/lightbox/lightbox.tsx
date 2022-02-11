import React, { MouseEvent, useState, useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';

import { Arrow, PublicChildMethods } from './arrow';
import { CloseButton } from './closeButton';
import { GalleryImage, Direction } from '../types';
import { Props, TransitionState, Images } from './types';

import './lightbox.css';
  
export function Lightbox<T>(props: Props<T>) {
  const { animation = 'slide', renderFullImage } = props;
  const [activeIndex, setActiveIndex] = useState(props.activeIndex ?? 0);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>('right');
  const timer = useRef<number | undefined>();

  const prevIndex = (activeIndex + props.images.length - 1) % props.images.length;
  const nextIndex = (activeIndex + props.images.length + 1) % props.images.length;

  const arrowRefs: Record<Direction, RefObject<PublicChildMethods>> = {
    left: useRef(null),
    right: useRef(null)
  };

  const [visibleImages, setVisibleImages] = useState<Images<GalleryImage<T>>>({
    previousImage: props.images[props.activeIndex ?? 0],
    currentImage: props.images[props.activeIndex ?? 0]
  })

  const getAnimationClassName = (state: TransitionState) => {
    if (animation === 'slide') {
      return `sg-slide-${direction}-${state}`;
    }
    
    if (animation === 'fade') {
      return `sg-fade-${state}`;
    }

    return '';
  };

  const [transitionState, setTransitionState] = useState<Images<TransitionState>>({
    previousImage: 'exited',
    currentImage: 'entered'
  })

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.focus();
    }
  }, [containerRef]);

  useEffect(() => {
    setActiveIndex(props.activeIndex ?? 0);
  }, [props.activeIndex]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setTransitionState({
        previousImage: 'exited',
        currentImage: 'entered'
      })
    }, 0)

    return () => {
      clearTimeout(timer.current);
    }
  }, [visibleImages]);

  const hasSomeImagesTitle = props.images.some(image => Boolean(image.title));

  const handleMove = (newIndex: number, newDirection: Direction) => {
    arrowRefs[newDirection].current?.toggleAnimation(true);

    setTransitionState({
      previousImage: 'exiting',
      currentImage: 'entering'
    })
    
    setVisibleImages(state => ({
      previousImage: state.currentImage,
      currentImage: props.images[newIndex]
    }));

    setActiveIndex(newIndex);
    setDirection(newDirection);
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
    <div className="sg-text-white sg-h-full sg-relative sg-w-full sg-text-5xl sm:sg-text-6xl sg-flex sg-flex-col sg-justify-center sg-select-none">
      <Arrow
        className="sg-left-0 hover:before:sg-bg-gradient-to-r"
        direction="left"
        hasAdjustedPosition={hasSomeImagesTitle}
        onClick={() => handleMove(prevIndex, 'left')}
        ref={arrowRefs.left}
      />
      <Arrow
        className="sg-right-0 hover:before:sg-bg-gradient-to-l"
        direction="right"
        hasAdjustedPosition={hasSomeImagesTitle}
        onClick={() => handleMove(nextIndex, 'right')}
        ref={arrowRefs.right}
      />
    </div>
  ) : null;


  const renderImageTitle = (image: GalleryImage<T>) => hasSomeImagesTitle && (
    <div className="sg-text-white sg-text-center sg-select-none sg-min-h-50px sg-flex sg-flex-col sg-justify-center sg-text-base">
      {image.title}
    </div>
  );

  const handleAnimationEnd = () => {
    setVisibleImages(state => ({
      ...state,
      previousImage: state.currentImage
    }))
  }

  const renderImage = (image: GalleryImage<T>, transitionClass: string) => (
    <div
      onTransitionEnd={handleAnimationEnd}
      className={`sg-image-wrapper sg-absolute sg-top-0 sg-left-0 sg-right-0 sg-bottom-0 sg-w-full sg-m-auto sg-flex sg-flex-col sg-justify-center sg-items-center ${Boolean(image.title) ? 'sg-has-title' : ''} ${transitionClass}`}
    >
      {renderFullImage(image)}
      {renderImageTitle(image)}
    </div>
  )

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
        <CloseButton onClose={props.onClose} />
        {animation !== 'none' && renderImage(visibleImages.previousImage, getAnimationClassName(transitionState.previousImage))}
        {renderImage(visibleImages.currentImage, getAnimationClassName(transitionState.currentImage))}
        {renderArrows()}
      </div>
    </div>
  );

  return createPortal(
    renderModal(),
    document.body
  );
};