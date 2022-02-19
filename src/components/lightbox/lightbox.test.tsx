import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from './lightbox';
import { getMockedImages } from '../../utils';

describe('Lightbox', () => {
  it('should render component', () => {
    const mockedImages = getMockedImages(3);
    const onClose = jest.fn();

    render(
      <Lightbox
        images={mockedImages}
        activeIndex={0}
        onClose={onClose}
      />
    );

    const dialog = screen.queryByRole('dialog');
    const images = dialog?.querySelectorAll('img');
    expect(dialog).toBeInTheDocument();
    expect(images?.length).toBe(1);
    expect(images?.[0].src).toBe('http://localhost/full_0.jpg');
  });

  describe('navigation when transition = none', () => {
    it('should navigate to the right by clicking on the right arrow', async () => {
      const mockedImages = getMockedImages(3);
      const onClose = jest.fn();

      render(
        <Lightbox
          images={mockedImages}
          transition="none"
          activeIndex={0}
          onClose={onClose}
          renderFullImage={image => (
            <img
              data-testid="full-image"
              alt="full"
              src={image.full}
            />
          )}
        />
      );

      const rightArrow = screen.getByTestId('right-arrow');
      const image1 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image1.src).toBe('http://localhost/full_0.jpg');
      fireEvent.click(rightArrow);
      const image2 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image2.src).toBe('http://localhost/full_1.jpg');
      fireEvent.click(rightArrow);
      const image3 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image3.src).toBe('http://localhost/full_2.jpg');
      fireEvent.click(rightArrow);
      const image4 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image4.src).toBe('http://localhost/full_0.jpg');
    });
  });
});
