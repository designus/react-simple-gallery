import { GalleryImage, TransitionType, RenderImage } from '../types';

export interface Props<T> {
  onClose: VoidFunction;
  images: GalleryImage<T>[];
  activeIndex?: number;
  transition?: TransitionType;
  renderFullImage?: RenderImage<T>;
}

export type TransitionState = 'exited' | 'exiting' | 'entered' | 'entering' | '';

export interface Images<T> {
  nextImage: T | null,
  currentImage: T | null
}
