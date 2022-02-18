import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageList } from './imageList';

describe('ImageList', () => {
  it('should render component', () => {
    const images = [...Array(4)].map((photo, index) => ({
      full: `photo_${index}_full.jpg`,
      thumb: `photo_${index}_thumb.jpg`,
      title: index % 2 ? `Photo title no ${index}` : undefined
    }));

    render(<ImageList images={images} />);

    expect(screen.getAllByRole('listitem').length).toBe(4);
  });
});
