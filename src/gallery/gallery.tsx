
  
import React, { useState } from 'react';
import classNames from 'classnames';
import { Lightbox } from '../lightbox';

import './gallery.css';

export interface GalleryImage<T> {
  full: T;
  thumb: T;
  alt?: string;
  title?: string;
  caption?: string;
}

interface Props<T> {
  images: GalleryImage<T>[];
  className?: string;
  renderThumbImage: (image: GalleryImage<T>) => JSX.Element;
  renderFullImage: (image: GalleryImage<T>) => JSX.Element;
}

export function Gallery<T>(props: Props<T>) {
  const { images = [], className = '', renderThumbImage, renderFullImage } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLightboxClose = () => {
    setIsOpen(false);
    setActiveIndex(0);
  };

  return (
    <React.Fragment>
      <div role="list" className={classNames(className, {
        'gallery-wrapper grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4': !className
      })}>
        {images.map((image, index) => {
          return (
            <div
              className="cursor-pointer"
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
    </React.Fragment>
  );
};