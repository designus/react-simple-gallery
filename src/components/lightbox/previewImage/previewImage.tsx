import React, { FC } from 'react';
import { GalleryImage, RenderImage } from '../../types';

interface Props<T> {
  onTransitionEnd?: VoidFunction;
  showTitle: boolean;
  transitionClass?: string;
  renderImage: RenderImage<T>;
  image: GalleryImage<T> | null;
}
  
export function PreviewImage<T>(props: Props<T>) {
  const { transitionClass = '', showTitle, image, renderImage, onTransitionEnd } = props; 
  
  const imageTitle = image && showTitle && (
    <div className="sg-text-white sg-text-center sg-select-none sg-min-h-50px sg-flex sg-flex-col sg-justify-center sg-text-base">
      {image.title}
    </div>
  );

  return image && (
    <div
      onTransitionEnd={onTransitionEnd}
      className={`sg-image-wrapper sg-absolute sg-top-0 sg-left-0 sg-right-0 sg-bottom-0 sg-w-full sg-m-auto sg-flex sg-flex-col sg-justify-center sg-items-center ${Boolean(image.title) ? 'sg-has-title' : ''} ${transitionClass}`}
    >
      {renderImage(image)}
      {imageTitle}
    </div>
  );
};