import { GalleryImage } from '../types';

export const getMockedImages = (count: number): GalleryImage<string>[] => [...Array(count)].map((photo, index) => ({
  full: `full_${index}.jpg`,
  thumb: `thumb_${index}.jpg`,
  title: index % 2 ? `Photo title no ${index}` : undefined
}));
