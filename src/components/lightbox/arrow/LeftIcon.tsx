import React, { FC } from 'react';

interface Props {
  className: string;
}

export const LeftIcon: FC<Props> = props => (
  <svg
    className={props.className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
  </svg>
);
