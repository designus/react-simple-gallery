import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CloseButton } from './closeButton';

describe('CloseButton', () => {
  it('should render CloseButton', () => {
    const onClose = jest.fn();
    render(<CloseButton onClose={onClose} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
