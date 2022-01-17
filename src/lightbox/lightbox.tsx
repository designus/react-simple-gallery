import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GalleryImage } from '../gallery';
import CloseIcon from './close-icon.svg?component';
import Left from './left-icon.svg?component';
import Right from './right-icon.svg?component';

import './lightbox.css';
  
interface Props<T> {
  onClose: VoidFunction;
  images: GalleryImage<T>[];
  activeIndex?: number;
  animation?: 'slide' | 'fade' | 'none';
  renderFullImage: (image: GalleryImage<T>) => JSX.Element;
}

type Direction = 'left' | 'right';
  
export function Lightbox<T>(props: Props<T>) {
  const { animation = 'slide', renderFullImage } = props;
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(props.activeIndex ?? 0);
  const initialAnimateArrow = useRef<Record<Direction, boolean>>({
    left: false,
    right: false
  });

  const [animateArrow, setAnimateArrow] = useState(initialAnimateArrow.current);

  const prevIndex = (activeIndex + props.images.length - 1) % props.images.length;
  const nextIndex = (activeIndex + props.images.length + 1) % props.images.length;
  const isReversed = animateArrow.left && activeIndex === props.images.length - 1;
  const transitionTimeout = animation === 'slide' ? 500 : 300;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.focus();
    }
  }, [containerRef]);

  useEffect(() => {
    setAnimateArrow(initialAnimateArrow.current);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(props.activeIndex ?? 0);
  }, [props.activeIndex]);

  const hasSomeImagesTitle = props.images.some(image => Boolean(image.title));

  const getAnimationClassName = () => {
    if (animation === 'slide') {
      return `slide-${animateArrow.left ? 'left' : 'right'}`;
    }
    
    if (animation === 'fade') {
      return 'fade';
    }

    return '';
  };

  const handleMove = (newIndex: number, direction: Direction) => {
    setAnimateArrow({
      left: direction === 'left',
      right: direction === 'right'
    });
    setActiveIndex(newIndex);
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

  const handleOnEnter = (item: HTMLElement) => {
    if (isReversed) {
      item.parentElement?.classList.add('reversed');
    } else {
      item.parentElement?.classList.remove('reversed');
    }
  }

  const renderArrow = (className: string, newIndex: number, direction: Direction) => {
    const Icon = direction === 'left' ? Left : Right;
    return props.images.length > 1 ? (
      <CSSTransition in={animateArrow[direction]} timeout={200} classNames="arrow">
        <div
          className={classNames(
            'group',
            'w-14',
            'sm:w-24',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            'h-full',
            'absolute',
            'select-none',
            'pointer',
            'opacity-60',
            'hover:opacity-100',
            'hover:before:absolute',
            'hover:before:w-full',
            'hover:before:h-full',
            'hover:before:-z-10',
            'hover:before:from-black',
            'hover:before:opacity-60',
            'z-10',
            className
          )}
        >
          <div
            aria-label={`${direction} arrow`}
            onClick={() => handleMove(newIndex, direction)}
            role="button"
            tabIndex={0}
            className={classNames(
              'rounded-full',
              'bg-white',
              'bg-opacity-70',
              'w-46px',
              'h-46px',
              'sm:w-56px',
              'sm:h-56px',
              'relative',
              'hover:bg-opacity-100',
              'flex',
              'justify-center',
              'items-center',
              {
                'transform -translate-y-25px': hasSomeImagesTitle
              }
            )}
          >
            <Icon className={classNames('fill-gray-700 w-36px h-36px sm:w-46px sm:h-46px')} />
          </div>
        </div>
      </CSSTransition>
    ) : null;
  }

  const renderArrows = () => (
    <div className="text-white h-full relative w-full text-5xl sm:text-6xl flex flex-col justify-center select-none">
      {renderArrow('left-0 hover:before:bg-gradient-to-r', prevIndex, 'left')}
      {renderArrow('right-0 hover:before:bg-gradient-to-l', nextIndex, 'right')}
    </div>
  );

  const renderClose = () => (
    <div
      role="button"
      tabIndex={0}
      aria-label="Close image button"
      onClick={props.onClose}
      className="absolute z-20 right-10px top-10px flex justify-center items-center bg-black bg-opacity-30 rounded-full cursor-pointer"
    >
      <CloseIcon className="fill-white w-10 h-10 mr-2px sm:w-12 sm:h-12" />
    </div>
  );

  const renderImageTitle = (image: GalleryImage<T>) => hasSomeImagesTitle && (
    <div className="text-white text-center p-5px select-none min-h-50px flex flex-col justify-center text-base">
      {image.title}
    </div>
  );

  const renderModal = () => (
    <div
      role="dialog"
      tabIndex={-1}
      aria-label="Image modal"
      className={`
        fixed
        top-0
        bottom-0
        left-0
        right-0
        h-screen
        z-50
        flex
        justify-center
        items-center
        flex-col
        before:absolute
        before:top-0
        before:bottom-0
        before:left-0
        before:right-0
        before:h-screen
        before:-z-10
        before:bg-black
        before:bg-opacity-90
      `}
      onKeyDown={handleKeyDown}
      onMouseDown={handleClose}
      ref={containerRef}
    >
      <div className="w-full h-full relative">
        {renderClose()}
        <TransitionGroup>
          {props.images.map((image, index) => index === activeIndex && (
            <CSSTransition
              key={index}
              timeout={transitionTimeout}
              classNames={getAnimationClassName()}
              onEnter={handleOnEnter}
            >
              <div style={{}} className="absolute top-0 left-0 right-0 bottom-0 w-full m-auto flex flex-col justify-center items-center">
                {renderFullImage(image)}
                {renderImageTitle(image)}
              </div>
            </CSSTransition>
          ))}
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