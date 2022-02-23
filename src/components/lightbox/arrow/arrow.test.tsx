import React, { RefObject } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Arrow, PublicChildMethods } from './arrow';

describe('Arrow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call onClick method and pass direction during onClick event', () => {
    const onClick = jest.fn();
    render(
      <Arrow
        direction="left"
        onClick={onClick}
        hasAdjustedPosition={false}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledWith('left');
  });

  it('should call onClick method and pass direction during onKeyDown event', () => {
    const onClick = jest.fn();
    render(
      <Arrow
        direction="right"
        onClick={onClick}
        hasAdjustedPosition={false}
      />
    );

    fireEvent.keyDown(screen.getByRole('button'), { code: 'Enter' });

    expect(onClick).toHaveBeenCalledWith('right');
  });

  it('should start transition when toggle transition method is called from outside', () => {
    const ref: RefObject<PublicChildMethods> = {
      current: null
    };

    render(
      <Arrow
        ref={ref}
        direction="right"
        onClick={jest.fn()}
        hasAdjustedPosition={false}
      />
    );

    expect(screen.getByTestId('arrow-wrapper')).not.toHaveClass('sg-animate');

    act(() => {
      ref.current?.toggleTransition(true);
    });

    expect(screen.getByTestId('arrow-wrapper')).toHaveClass('sg-animate');
  });

  it('should end transition after timeout', () => {
    const ref: RefObject<PublicChildMethods> = {
      current: null
    };

    render(
      <Arrow
        ref={ref}
        direction="right"
        onClick={jest.fn()}
        hasAdjustedPosition={false}
      />
    );

    act(() => {
      ref.current?.toggleTransition(true);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('arrow-wrapper')).not.toHaveClass('sg-animate');
  });
});
