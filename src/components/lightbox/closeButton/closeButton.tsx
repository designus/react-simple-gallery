import React, { FC } from 'react';

interface Props {
  onClose: VoidFunction;
}

export const CloseButton: FC<Props> = props => (
  <div
    data-testid="close-button"
    className="sg-absolute sg-z-20 sg-right-10px sg-top-10px sg-flex sg-justify-center sg-items-center sg-bg-black sg-bg-opacity-30 sg-rounded-full sg-cursor-pointer"
    role="button"
    tabIndex={0}
    aria-label="Close image button"
    onKeyDown={props.onClose}
    onClick={props.onClose}
  >
    <svg
      className="sg-fill-white sg-w-10 sg-h-10 sg-mr-2px sm:sg-w-12 sm:sg-h-12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
    >
      <path d="M321.6 766.4c12.48 12.48 32.768 12.48 45.248 0l177.152-177.152 177.152 177.152c12.48 12.48 32.768 12.48 45.248 0s12.48-32.768 0-45.248l-177.152-177.152 177.152-177.152c12.48-12.48 12.48-32.768 0-45.248s-32.768-12.48-45.248 0l-177.152 177.152-177.152-177.152c-12.48-12.48-32.768-12.48-45.248 0s-12.48 32.768 0 45.248l177.152 177.152-177.152 177.152c-12.48 12.48-12.48 32.768 0 45.248z" />
    </svg>
  </div>
);
