import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageList } from './imageList';
import { getMockedImages } from '../utils';

describe('ImageList', () => {
  it('should render a list of thumb images', () => {
    const mockedImages = getMockedImages(2);

    render(<ImageList images={mockedImages} />);
    const elements = screen.getAllByRole('listitem');
    const imageSources = elements.map(elem => elem.querySelector('img')?.src);

    expect(imageSources).toEqual(['http://localhost/thumb_0.jpg', 'http://localhost/thumb_1.jpg']);
  });

  it('should use renderThumbImage function when provided', () => {
    const mockedImages = getMockedImages(2);

    const { container } = render(
      <ImageList
        images={mockedImages}
        renderThumbImage={image => (
          <div className="custom-wrapper">
            <img
              alt=""
              src={image.thumb}
            />
          </div>
        )}
      />
    );

    expect(container.getElementsByClassName('custom-wrapper').length).toBe(2);
  });

  it('should open image lightbox when clicking on the thumb image', () => {
    const mockedImages = getMockedImages(4);
    render(<ImageList images={mockedImages} />);
    const elements = screen.getAllByRole('listitem');
    const imageIndex = 1;
    fireEvent.click(elements[imageIndex]);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(dialog.querySelector('img')?.src).toBe(`http://localhost/full_${imageIndex}.jpg`);
  });

  it('should close image lightbox when clicking on the close button', () => {
    const mockedImages = getMockedImages(4);
    render(<ImageList images={mockedImages} />);
    const elements = screen.getAllByRole('listitem');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(elements[0]);
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('close-button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should throw an exception when different image structure is used without providing renderThumbImage parameter', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const mockedImages = getMockedImages(2).map(image => ({
      ...image,
      thumb: {
        url: image.thumb
      },
      full: {
        url: image.full
      }
    }));

    expect(() => render(<ImageList images={mockedImages} />)).toThrow('Please specify renderThumbImage parameter');

    spy.mockRestore();
  });

  it('should render a list of thumb images using different image structure', () => {
    const mockedImages = getMockedImages(2).map(image => ({
      ...image,
      thumb: {
        url: image.thumb
      },
      full: {
        url: image.full
      }
    }));

    render(
      <ImageList
        images={mockedImages}
        renderThumbImage={image => (
          <div className="custom-wrapper">
            <img
              alt=""
              src={image.thumb.url}
            />
          </div>
        )}
      />
    );

    const elements = screen.getAllByRole('listitem');
    const imageSources = elements.map(elem => elem.querySelector('img')?.src);

    expect(imageSources).toEqual(['http://localhost/thumb_0.jpg', 'http://localhost/thumb_1.jpg']);
  });

  it('should apply different className when provided', () => {
    const mockedImages = getMockedImages(1);
    render(
      <ImageList
        images={mockedImages}
        className="other-layout"
      />
    );

    expect(screen.getByRole('list')).toHaveClass('other-layout');
  });
});
