import React, { FC } from 'react';

interface Props {
  className: string;
}

export const RightIcon: FC<Props> = props => (
  <svg
    className={props.className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
  </svg>
);
