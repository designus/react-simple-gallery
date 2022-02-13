import { GalleryImage, TransitionAnimation, RenderImage } from '../types';

export interface Props<T> {
  onClose: VoidFunction;
  images: GalleryImage<T>[];
  activeIndex?: number;
  animation?: TransitionAnimation;
  renderFullImage: RenderImage<T>;
}

export type TransitionState = 'exited' | 'exiting' | 'entered' | 'entering' | '';

export interface Images<T> {
  previousImage: T | null,
  currentImage: T
}