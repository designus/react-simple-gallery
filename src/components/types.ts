export type ImageSource = string | Record<string, any>;

export interface GalleryImage<T extends ImageSource> {
  id?: string | number;
  full: T;
  thumb: T;
  alt?: string;
  title?: string;
  caption?: string;
}

export type RenderImage<T extends ImageSource> = (image: GalleryImage<T>) => JSX.Element;

export type TransitionAnimation = 'slide' | 'fade' | 'none';

export type Direction = 'left' | 'right';
