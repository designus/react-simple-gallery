import React from 'react';
import { render, screen } from '@testing-library/react';
import { PreviewImage } from './previewImage';
import { getMockedImages } from '../../../utils';

describe('PreviewImage', () => {
  it('should render component', () => {
    const [mockedImage] = getMockedImages(1);

    render(
      <PreviewImage
        showTitle
        image={mockedImage}
        renderImage={image => (
          <img
            alt="full"
            src={image.full}
          />
        )}
      />
    );

    const imageWrapper = screen.queryByTestId('image-wrapper');
    expect(imageWrapper).toBeInTheDocument();
  });

  it('should render image title when showTitle parameter is truthy', () => {
    const [mockedImage] = getMockedImages(1);
    mockedImage.title = 'This is image title';

    render(
      <PreviewImage
        showTitle
        image={mockedImage}
        renderImage={image => (
          <img
            alt="full"
            src={image.full}
          />
        )}
      />
    );

    const imageTitle = screen.queryByTestId('image-title');
    expect(imageTitle).toBeInTheDocument();
    expect(imageTitle?.textContent).toBe('This is image title');
  });

  it('should not render image title when showTitle parameters are falsy', () => {
    const [mockedImage] = getMockedImages(1);
    mockedImage.title = 'This is image title';

    render(
      <PreviewImage
        showTitle={false}
        image={mockedImage}
        renderImage={image => (
          <img
            alt="full"
            src={image.full}
          />
        )}
      />
    );

    const imageTitle = screen.queryByTestId('image-title');
    expect(imageTitle).not.toBeInTheDocument();
  });
});
