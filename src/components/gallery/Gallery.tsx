import React from 'react';
import { ErrorBoundary } from '../errorBoundary';
import { ImageSource } from '../types';
import { ImageList, Props } from '../imageList';

import './style.css';

export function Gallery<T extends ImageSource>(props: Props<T>) {
  return (
    <ErrorBoundary>
      <ImageList {...props} />
    </ErrorBoundary>
  );
}
