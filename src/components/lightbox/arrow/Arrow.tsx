import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Direction } from '../../types';
import Left from './left-icon.svg?component';
import Right from './right-icon.svg?component';
import './arrow.css';

interface Props {
  className: string;
  direction: Direction;
  hasAdjustedPosition: boolean;
  onClick: (direction: Direction) => void;
}

export interface PublicChildMethods {
  toggleAnimation: (isOn: boolean) => void;
}
  
export const Arrow = forwardRef<PublicChildMethods, Props>((props, ref) => {
  const { className, direction, hasAdjustedPosition, onClick } = props;

  const [animation, setAnimation] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    toggleAnimation(isOn: boolean) {
      setAnimation(isOn);
    }
  }));

  const Icon = direction === 'left' ? Left : Right;

  useEffect(() => {
    if (animation) {
      setTimeout(() => {
        setAnimation(false)
      }, 200)
    }

  }, [animation])

  const handleClick = (direction: Direction) => {
    onClick(direction);
  }

  return (
    <div
      className={`
        sg-arrow
        sg-group
        sg-w-14
        sm:sg-w-24
        sg-flex
        sg-flex-col
        sg-justify-center
        sg-items-center
        sg-h-full
        sg-absolute
        sg-select-none
        sg-pointer
        sg-opacity-60
        sg-cursor-pointer
        hover:sg-opacity-100
        hover:before:sg-absolute
        hover:before:sg-w-full
        hover:before:sg-h-full
        hover:before:-sg-z-10
        hover:before:sg-from-black
        hover:before:sg-opacity-60
        sg-z-10
        ${className}
        ${animation ? 'sg-animate' : ''}
      `}
    >
      <div
        aria-label={`${direction} arrow`}
        onClick={() => handleClick(direction)}
        role="button"
        tabIndex={0}
        className={`
          sg-rounded-full
          sg-bg-white
          sg-bg-opacity-70
          sg-relative
          sg-hover:bg-opacity-100
          sg-flex
          sg-justify-center
          sg-items-center
          ${hasAdjustedPosition ? 'sg-transform sg--translate-y-18px sm:sg--translate-y-23px' : ''}
        `}
      >
        <Icon className={`
          sg-fill-gray-700
          sg-w-36px
          sg-h-36px
          sm:sg-w-46px
          sm:sg-h-46px
        `}
        />
      </div>
    </div>
  );
});