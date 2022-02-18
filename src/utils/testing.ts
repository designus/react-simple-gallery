import { GalleryImage } from '../components/types';

export const getMockedImages = (count: number): GalleryImage<string>[] => [...Array(count)].map((photo, index) => ({
  full: `photo_${index}_full.jpg`,
  thumb: `photo_${index}_thumb.jpg`,
  title: index % 2 ? `Photo title no ${index}` : undefined
}));
