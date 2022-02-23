import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CloseButton } from './closeButton';

describe('CloseButton', () => {
  it('should render component', () => {
    const onClose = jest.fn();
    render(<CloseButton onClose={onClose} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should fire onClose upon click', () => {
    const onClose = jest.fn();
    render(<CloseButton onClose={onClose} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClose).toHaveBeenCalled();
  });
});
