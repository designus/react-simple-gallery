import React, { MouseEvent, useState, useEffect, useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';

import { Arrow, PublicChildMethods } from './arrow';
import { PreviewImage } from './previewImage';
import { CloseButton } from './closeButton';
import { GalleryImage, Direction, ImageSource } from '../types';
import { Props, TransitionState, Images } from './types';

import './lightbox.css';

const objectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

const defaultRenderFullImage = (image: GalleryImage<ImageSource>) => {
  if (typeof image.full !== 'string') {
    throw new Error('Please specify renderFullImage parameter');
  }

  return (
    <img
      src={image.full}
      alt={image.alt || ''}
    />
  );
};

export function Lightbox<T>(props: Props<T>) {
  const { transition = 'slide', renderFullImage = defaultRenderFullImage } = props;
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(props.activeIndex ?? 0);
  const [direction, setDirection] = useState<Direction>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prevIndex = (activeIndex + props.images.length - 1) % props.images.length;
  const nextIndex = (activeIndex + props.images.length + 1) % props.images.length;

  const arrowRefs: Record<Direction, RefObject<PublicChildMethods>> = {
    left: useRef(null),
    right: useRef(null)
  };

  const [visibleImages, setVisibleImages] = useState<Images<GalleryImage<T>>>({
    currentImage: props.images[props.activeIndex ?? 0],
    nextImage: null
  });

  const [transitionState, setTransitionState] = useState<Images<TransitionState>>({
    currentImage: '',
    nextImage: ''
  });

  const hasSomeImagesTitle = props.images.some(image => Boolean(image.title));

  const getTransitionClassName = (state: TransitionState | null) => {
    if (state && transition === 'slide') {
      return `sg-slide-${direction}-${state}`;
    }

    if (state && transition === 'fade') {
      return `sg-fade-${state}`;
    }

    return '';
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current?.focus();
    }
  }, [containerRef]);

  useEffect(() => {
    setActiveIndex(props.activeIndex ?? 0);
  }, [props.activeIndex]);

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => {
        setTransitionState((state) => {
          if (state.nextImage === 'entering') {
            return {
              nextImage: 'entered',
              currentImage: 'exited'
            };
          }
          return {
            currentImage: 'entered',
            nextImage: 'exited'
          };
        });
      }, 50);
    }
  }, [isTransitioning]);

  const handleMove = (newIndex: number, newDirection: Direction) => {
    if (transition !== 'none' && isTransitioning) return;

    arrowRefs[newDirection].current?.toggleTransition(true);

    setActiveIndex(newIndex);

    setDirection(newDirection);

    if (transition !== 'none') {
      setIsTransitioning(true);

      if (visibleImages.currentImage === null) {
        setTransitionState({
          nextImage: 'exiting',
          currentImage: 'entering'
        });

        setVisibleImages((state) => ({
          currentImage: props.images[newIndex],
          nextImage: state.nextImage
        }));
      } else {
        setTransitionState({
          nextImage: 'entering',
          currentImage: 'exiting'
        });

        setVisibleImages((state) => ({
          currentImage: state.currentImage,
          nextImage: props.images[newIndex]
        }));
      }
    } else {
      setVisibleImages((state) => ({
        ...state,
        currentImage: props.images[newIndex]
      }));
    }
  };

  const handleTransitionEnd = () => {
    if (isTransitioning) {
      setIsTransitioning(false);

      if (transitionState.nextImage === 'entered') {
        setVisibleImages((state) => ({ nextImage: state.nextImage, currentImage: null }));
      } else {
        setVisibleImages((state) => ({ currentImage: state.currentImage, nextImage: null }));
      }

      setTransitionState({ nextImage: '', currentImage: '' });
    }
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

    if (keyCode === 'ArrowLeft' && !isTransitioning) {
      handleMove(prevIndex, 'left');
    } else if (keyCode === 'ArrowRight' && !isTransitioning) {
      handleMove(nextIndex, 'right');
    } else if (keyCode === 'Escape') {
      props.onClose();
    }
  };

  const renderArrows = () => (props.images.length > 1 ? (
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
  ) : null);

  const renderImages = () => {
    if (transition === 'none') {
      return (
        <PreviewImage
          showTitle={hasSomeImagesTitle}
          renderImage={renderFullImage}
          image={visibleImages.currentImage}
        />
      );
    }

    return objectKeys(visibleImages).map((key) => (
      <PreviewImage
        key={key}
        showTitle={hasSomeImagesTitle}
        renderImage={renderFullImage}
        image={visibleImages[key]}
        onTransitionEnd={handleTransitionEnd}
        transitionClass={getTransitionClassName(transitionState[key])}
      />
    ));
  };

  const renderModal = () => (
    <div
      role="dialog"
      aria-label="Image modal"
      className={`sg-modal sg-fixed sg-top-0 sg-bottom-0 sg-left-0 sg-right-0 sg-h-screen sg-z-50 sg-flex sg-justify-center sg-items-center sg-flex-col before:sg-absolute before:sg-top-0 
      before:sg-bottom-0 before:sg-left-0 before:sg-right-0 before:sg-h-screen before:-sg-z-10 before:sg-bg-black`}
    >
      <div
        data-testid="image-container"
        role="presentation"
        tabIndex={-1}
        ref={containerRef}
        onKeyDown={handleKeyDown}
        onMouseDown={handleClose}
        className="sg-w-full sg-h-full sg-relative"
      >
        <CloseButton onClose={props.onClose} />
        {renderImages()}
        {renderArrows()}
      </div>
    </div>
  );

  return createPortal(
    renderModal(),
    document.body
  );
}
