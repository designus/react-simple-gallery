import React, { FC } from 'react';
import CloseIcon from './close-icon.svg?component';

interface Props {
  onClose: VoidFunction;
}

export const CloseButton: FC<Props> = props => (
  <div
    className="sg-absolute sg-z-20 sg-right-10px sg-top-10px sg-flex sg-justify-center sg-items-center sg-bg-black sg-bg-opacity-30 sg-rounded-full sg-cursor-pointer"
    role="button"
    tabIndex={0}
    aria-label="Close image button"
    onKeyDown={props.onClose}
    onClick={props.onClose}
  >
    <CloseIcon className="sg-fill-white sg-w-10 sg-h-10 sg-mr-2px sm:sg-w-12 sm:sg-h-12" />
  </div>
);
