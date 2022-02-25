import React from 'react';
import { GalleryImage, RenderImage } from '../../types';

interface Props<T> {
  showTitle: boolean;
  renderImage: RenderImage<T>;
  image: GalleryImage<T> | null;
  transitionClass?: string;
  onTransitionEnd?: VoidFunction;
}

export function PreviewImage<T>(props: Props<T>) {
  const { transitionClass = '', showTitle, image, renderImage, onTransitionEnd } = props;

  const renderImageTitle = () => (showTitle ? (
    <div
      data-testid="image-title"
      className="sg-text-white sg-text-center sg-select-none sg-min-h-50px sg-flex sg-flex-col sg-justify-center sg-text-base"
    >
      {image?.title}
    </div>
  ) : null);

  return image && (
    <div
      data-testid="image-wrapper"
      onTransitionEnd={onTransitionEnd}
      className={`sg-image-wrapper sg-absolute sg-top-0 sg-left-0 sg-right-0 sg-bottom-0 sg-w-full sg-m-auto sg-flex sg-flex-col sg-justify-center sg-items-center ${image.title ? 'sg-has-title' : ''} ${transitionClass}`}
    >
      {renderImage(image)}
      {renderImageTitle()}
    </div>
  );
}
