
  
import React, { useState } from 'react';
import classNames from 'classnames';
import { Lightbox } from '../lightbox';
import { GalleryImage, ImageSource, RenderImage } from '../types';

import './imageList.css';

const defaultRenderThumbImage = (image: GalleryImage<ImageSource>) => {
  if (typeof image.thumb !== 'string') {
    throw new Error('Please specify renderThumbImage parameter')
  }

  return (
    <img src={image.thumb} alt={image.alt || ''} />
  )
}

const defaultRenderFullImage = (image: GalleryImage<ImageSource>) => {
  if (typeof image.full !== 'string') {
    throw new Error('Please specify renderFullImage parameter')
  }

  return (
    <div className="max-w-screen-2xl">
      <img src={image.full} alt={image.alt || ''} />
    </div>
  );
}

export interface Props<T extends ImageSource> {
  images: GalleryImage<T>[];
  className?: string;
  renderThumbImage?: RenderImage<T>;
  renderFullImage?: RenderImage<T>;
}

export function ImageList<T extends ImageSource>(props: Props<T>) {
  const {
    images = [],
    className = '',
    renderThumbImage = defaultRenderThumbImage,
    renderFullImage = defaultRenderFullImage
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLightboxClose = () => {
    setIsOpen(false);
    setActiveIndex(0);
  };

  const defaultClassName = 'gallery-wrapper grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4';

  return (
    <>
      <div
        role="list"
        className={classNames(className, { [defaultClassName]: !className })}
      >
        {images.map((image, index) => {
          return (
            <div
              className="gallery-item cursor-pointer"
              role="listitem"
              key={index}
              onClick={() => {
                setIsOpen(true);
                setActiveIndex(index);
              }}
            >
              {renderThumbImage(image)}
            </div>
          );
        })}
      </div>
      {isOpen ? (
        <Lightbox
          onClose={handleLightboxClose}
          images={images}
          activeIndex={activeIndex}
          renderFullImage={renderFullImage}
        />
      ) : null}
    </>
  );
};