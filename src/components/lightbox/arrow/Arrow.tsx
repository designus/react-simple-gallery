import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Direction } from '../../types';
import { LeftIcon } from './LeftIcon';
import { RightIcon } from './RightIcon';
import './arrow.css';

interface Props {
  className?: string;
  direction: Direction;
  hasAdjustedPosition: boolean;
  onClick: (direction: Direction) => void;
}

export interface PublicChildMethods {
  toggleTransition: (isOn: boolean) => void;
}

export const Arrow = forwardRef<PublicChildMethods, Props>((props, ref) => {
  const { className = '', direction, hasAdjustedPosition, onClick } = props;
  const [transition, setTransition] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    toggleTransition(isOn: boolean) {
      setTransition(isOn);
    }
  }));

  const Icon = direction === 'left' ? LeftIcon : RightIcon;

  useEffect(() => {
    if (transition) {
      setTimeout(() => {
        setTransition(false);
      }, 200);
    }
  }, [transition]);

  return (
    <div
      data-testid="arrow-wrapper"
      className={`sg-arrow sg-group sg-w-14 sm:sg-w-24 sg-flex sg-flex-col sg-justify-center sg-items-center sg-h-full sg-absolute sg-select-none sg-pointer sg-opacity-60  sg-cursor-pointer
        hover:sg-opacity-100 hover:before:sg-absolute hover:before:sg-w-full hover:before:sg-h-full hover:before:-sg-z-10 hover:before:sg-from-black hover:before:sg-opacity-60 sg-z-10
        ${className} ${transition ? 'sg-animate' : ''}`}
    >
      <div
        data-testid={`${direction}-arrow`}
        aria-label={`${direction} arrow`}
        onClick={() => onClick(direction)}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            onClick(direction);
          }
        }}
        role="button"
        tabIndex={0}
        className={`sg-rounded-full sg-bg-white sg-bg-opacity-70 sg-relative sg-hover:bg-opacity-100 sg-flex sg-justify-center sg-items-center
          ${hasAdjustedPosition ? 'sg-transform sg--translate-y-18px sm:sg--translate-y-23px' : ''}
        `}
      >
        <Icon className="sg-fill-gray-700 sg-w-36px sg-h-36px sm:sg-w-46px sm:sg-h-46px" />
      </div>
    </div>
  );
});
