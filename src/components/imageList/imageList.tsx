import React, { useState } from 'react';
import { Lightbox } from '../lightbox';
import { GalleryImage, ImageSource, RenderImage, TransitionType } from '../types';

import './imageList.css';

const defaultRenderThumbImage = (image: GalleryImage<ImageSource>) => {
  if (typeof image.thumb !== 'string') {
    throw new Error('Please specify renderThumbImage parameter');
  }

  return (
    <img src={image.thumb} alt={image.alt || ''} />
  );
};

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

export interface Props<T extends ImageSource> {
  images: GalleryImage<T>[];
  className?: string;
  transition?: TransitionType;
  renderThumbImage?: RenderImage<T>;
  renderFullImage?: RenderImage<T>;
}

export function ImageList<T extends ImageSource>(props: Props<T>) {
  const {
    images = [],
    className = '',
    transition,
    renderThumbImage = defaultRenderThumbImage,
    renderFullImage = defaultRenderFullImage,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLightboxClose = () => {
    setIsOpen(false);
    setActiveIndex(0);
  };

  const defaultLayoutClasses = 'sg-gallery-list sg-auto-rows-fr sg-grid sg-gap-2 sg-grid-cols-2 sm:sg-grid-cols-3 md:sg-grid-cols-4';


  const handleKeyDown = (index: number) => () => {
    setIsOpen(true);
    setActiveIndex(index);
  };

  return (
    <>
      <div
        role="list"
        className={`${className} ${!className ? defaultLayoutClasses : ''}`}
      >
        {images.map((image, index) => (
          <div
            className="sg-gallery-item sg-cursor-pointer"
            role="presentation"
            key={image.id ?? index}
            onKeyDown={handleKeyDown(index)}
            onClick={handleKeyDown(index)}
          >
            {renderThumbImage(image)}
          </div>
        ))}
      </div>
      {isOpen ? (
        <Lightbox
          onClose={handleLightboxClose}
          images={images}
          transition={transition}
          activeIndex={activeIndex}
          renderFullImage={renderFullImage}
        />
      ) : null}
    </>
  );
}
