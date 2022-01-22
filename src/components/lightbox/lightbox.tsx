import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GalleryImage, TransitionAnimation } from '../types';
import CloseIcon from './close-icon.svg?component';
import Left from './left-icon.svg?component';
import Right from './right-icon.svg?component';

import './lightbox.css';
  
interface Props<T> {
  onClose: VoidFunction;
  images: GalleryImage<T>[];
  activeIndex?: number;
  animation?: TransitionAnimation;
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
      return `sg-slide-${animateArrow.left ? 'left' : 'right'}`;
    }
    
    if (animation === 'fade') {
      return 'sg-fade';
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
      item.parentElement?.classList.add('sg-reversed');
    } else {
      item.parentElement?.classList.remove('sg-reversed');
    }
  }

  const renderArrow = (className: string, newIndex: number, direction: Direction) => {
    const Icon = direction === 'left' ? Left : Right;
    return props.images.length > 1 ? (
      <CSSTransition in={animateArrow[direction]} timeout={200} classNames="sg-arrow">
        <div
          className={classNames(
            'sg-group',
            'sg-w-14',
            'sm:sg-w-24',
            'sg-flex',
            'sg-flex-col',
            'sg-justify-center',
            'sg-items-center',
            'sg-h-full',
            'sg-absolute',
            'sg-select-none',
            'sg-pointer',
            'sg-opacity-60',
            'sg-cursor-pointer',
            'hover:sg-opacity-100',
            'hover:before:sg-absolute',
            'hover:before:sg-w-full',
            'hover:before:sg-h-full',
            'hover:before:-sg-z-10',
            'hover:before:sg-from-black',
            'hover:before:sg-opacity-60',
            'sg-z-10',
            className
          )}
        >
          <div
            aria-label={`${direction} arrow`}
            onClick={() => handleMove(newIndex, direction)}
            role="button"
            tabIndex={0}
            className={classNames(
              'sg-rounded-full',
              'sg-bg-white',
              'sg-bg-opacity-70',
              'sg-w-46px',
              'sg-h-46px',
              'sg-sm:w-56px',
              'sg-sm:h-56px',
              'sg-relative',
              'sg-hover:bg-opacity-100',
              'sg-flex',
              'sg-justify-center',
              'sg-items-center',
              {
                'sg-transform -sg-translate-y-25px': hasSomeImagesTitle
              }
            )}
          >
            <Icon className={`
              sg-fill-gray-700
              sg-w-36px
              sg-h-36px
              sm:sg-w-46px
              sm:sg-h-46px
            `}
            />
          </div>
        </div>
      </CSSTransition>
    ) : null;
  }

  const renderArrows = () => (
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
      {renderArrow('sg-left-0 hover:before:sg-bg-gradient-to-r', prevIndex, 'left')}
      {renderArrow('sg-right-0 hover:before:sg-bg-gradient-to-l', nextIndex, 'right')}
    </div>
  );

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
      sg-p-5px
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
        before:sg-bg-opacity-90
      `}
      onKeyDown={handleKeyDown}
      onMouseDown={handleClose}
      ref={containerRef}
    >
      <div className="sg-w-full sg-h-full sg-relative">
        {renderClose()}
        <TransitionGroup>
          {props.images.map((image, index) => index === activeIndex && (
            <CSSTransition
              key={index}
              timeout={transitionTimeout}
              classNames={getAnimationClassName()}
              onEnter={handleOnEnter}
            >
              <div className={`
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
              `}>
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