import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageList } from './imageList';
import { getMockedImages } from '../../utils';

describe('ImageList', () => {
  it('should render component', () => {
    const images = getMockedImages(4);

    render(<ImageList images={images} />);

    expect(screen.getAllByRole('listitem').length).toBe(4);
  });
});
