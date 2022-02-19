import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageList } from './imageList';
import { getMockedImages } from '../../utils';

describe('ImageList', () => {
  it('should render list of thumb images', () => {
    const mockedImages = getMockedImages(2);

    render(<ImageList images={mockedImages} />);
    const elements = screen.getAllByRole('listitem');
    const imageSources = elements.map(elem => elem.querySelector('img')?.src);

    expect(imageSources).toEqual(['http://localhost/thumb_0.jpg', 'http://localhost/thumb_1.jpg']);
  });

  it('should open full image in a lightbox when clicking on the thumb image', () => {
    const mockedImages = getMockedImages(4);
    render(<ImageList images={mockedImages} />);
    const elements = screen.getAllByRole('listitem');
    fireEvent.click(elements[0]);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});
