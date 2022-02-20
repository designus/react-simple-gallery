import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Lightbox } from './lightbox';
import { getMockedImages } from '../../utils';

function triggerTransitionEnd(element: HTMLElement | null) {
  const event = new Event('transitionend', {
    bubbles: true,
    cancelable: true
  });
  element?.dispatchEvent(event);
}

describe('Lightbox', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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

    it('should navigate to the left by clicking on the left arrow', async () => {
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

      const leftArrow = screen.getByTestId('left-arrow');
      const image1 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image1.src).toBe('http://localhost/full_0.jpg');
      fireEvent.click(leftArrow);
      const image2 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image2.src).toBe('http://localhost/full_2.jpg');
      fireEvent.click(leftArrow);
      const image3 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image3.src).toBe('http://localhost/full_1.jpg');
      fireEvent.click(leftArrow);
      const image4 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image4.src).toBe('http://localhost/full_0.jpg');
    });
  });

  describe('navigation when transition = fade', () => {
    it('should navigate to the right by clicking on the right arrow', async () => {
      const mockedImages = getMockedImages(3);
      const onClose = jest.fn();

      render(
        <Lightbox
          images={mockedImages}
          transition="fade"
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
      act(() => {
        jest.runAllTimers();
      });
      triggerTransitionEnd(image1.parentElement);
      const image2 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image2.src).toBe('http://localhost/full_1.jpg');

      fireEvent.click(rightArrow);
      act(() => {
        jest.runAllTimers();
      });
      triggerTransitionEnd(image2.parentElement);
      const image3 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image3.src).toBe('http://localhost/full_2.jpg');

      fireEvent.click(rightArrow);
      act(() => {
        jest.runAllTimers();
      });
      triggerTransitionEnd(image3.parentElement);
      const image4 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image4.src).toBe('http://localhost/full_0.jpg');
    });

    it('should navigate to the left by clicking on the left arrow', async () => {
      const mockedImages = getMockedImages(3);
      const onClose = jest.fn();

      render(
        <Lightbox
          images={mockedImages}
          transition="fade"
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

      const leftArrow = screen.getByTestId('left-arrow');
      const image1 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image1.src).toBe('http://localhost/full_0.jpg');

      fireEvent.click(leftArrow);
      act(() => {
        jest.runAllTimers();
      });
      triggerTransitionEnd(image1.parentElement);
      const image2 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image2.src).toBe('http://localhost/full_2.jpg');

      fireEvent.click(leftArrow);
      act(() => {
        jest.runAllTimers();
      });
      triggerTransitionEnd(image2.parentElement);
      const image3 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image3.src).toBe('http://localhost/full_1.jpg');

      fireEvent.click(leftArrow);
      act(() => {
        jest.runAllTimers();
      });
      triggerTransitionEnd(image3.parentElement);
      const image4 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image4.src).toBe('http://localhost/full_0.jpg');
    });
  });

  describe('Keyboard buttons suppport', () => {
    it('should navigate left with keyboard left button', async () => {
      render(
        <Lightbox
          images={getMockedImages(3)}
          transition="none"
          activeIndex={0}
          onClose={jest.fn()}
          renderFullImage={image => (
            <img
              data-testid="full-image"
              alt="full"
              src={image.full}
            />
          )}
        />
      );

      const container = screen.getByTestId('image-container');

      fireEvent.keyDown(container, { code: 'ArrowLeft' });
      const image1 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image1.src).toBe('http://localhost/full_2.jpg');

      fireEvent.keyDown(container, { code: 'ArrowLeft' });
      const image2 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image2.src).toBe('http://localhost/full_1.jpg');

      fireEvent.keyDown(container, { code: 'ArrowLeft' });
      const image3 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image3.src).toBe('http://localhost/full_0.jpg');
    });

    it('should navigate right with keyboard right button', async () => {
      render(
        <Lightbox
          images={getMockedImages(3)}
          transition="none"
          activeIndex={0}
          onClose={jest.fn()}
          renderFullImage={image => (
            <img
              data-testid="full-image"
              alt="full"
              src={image.full}
            />
          )}
        />
      );

      const container = screen.getByTestId('image-container');

      fireEvent.keyDown(container, { code: 'ArrowRight' });
      const image1 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image1.src).toBe('http://localhost/full_1.jpg');

      fireEvent.keyDown(container, { code: 'ArrowRight' });
      const image2 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image2.src).toBe('http://localhost/full_2.jpg');

      fireEvent.keyDown(container, { code: 'ArrowRight' });
      const image3 = await screen.findByTestId<HTMLImageElement>('full-image');
      expect(image3.src).toBe('http://localhost/full_0.jpg');
    });

    it('should call on close when keyboard Escape button is clicked', () => {
      const onClose = jest.fn();
      render(
        <Lightbox
          images={getMockedImages(3)}
          transition="none"
          activeIndex={0}
          onClose={onClose}
        />
      );

      const container = screen.getByTestId('image-container');

      fireEvent.keyDown(container, { code: 'Escape' });

      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should throw an exception when different image structure is used without providing renderFullImage parameter', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    const onClose = jest.fn();

    const mockedImages = getMockedImages(2).map(image => ({
      ...image,
      thumb: {
        url: image.thumb
      },
      full: {
        url: image.full
      }
    }));

    expect(() => render(
      <Lightbox
        onClose={onClose}
        images={mockedImages}
      />
    )).toThrow('Please specify renderFullImage parameter');

    spy.mockRestore();
  });
});
