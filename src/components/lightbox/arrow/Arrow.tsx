import React, { FC, useRef, useState, useEffect, MutableRefObject } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Direction } from '../../types';
import Left from './left-icon.svg?component';
import Right from './right-icon.svg?component';
import './arrow.css';

interface Props {
  className: string;
  direction: Direction;
  animate: boolean;
  hasAdjustedPosition: boolean;
  onClick: (direction: Direction) => void;
}
  
export const Arrow: FC<Props> = props => {
  const { className, direction, hasAdjustedPosition, animate, onClick } = props;
  const arrowRefs: Record<Direction, MutableRefObject<null | HTMLDivElement>> = {
    left: useRef(null),
    right: useRef(null)
  }

  const Icon = direction === 'left' ? Left : Right;

  return (
    <CSSTransition
      nodeRef={arrowRefs[direction]}
      in={animate}
      timeout={200}
      classNames="sg-arrow"
    >
      <div
        ref={arrowRefs[direction]}
        className={classNames(
          'sg-group',
          'sg-w-14',
          'sm:sg-w-24',
          'sg-flex',
          'sg-flex-col',
          'sg-justify-center',
          'sg-items-center',
          'sg-h-full',
          'sg-absolute',
          'sg-select-none',
          'sg-pointer',
          'sg-opacity-60',
          'sg-cursor-pointer',
          'hover:sg-opacity-100',
          'hover:before:sg-absolute',
          'hover:before:sg-w-full',
          'hover:before:sg-h-full',
          'hover:before:-sg-z-10',
          'hover:before:sg-from-black',
          'hover:before:sg-opacity-60',
          'sg-z-10',
          className
        )}
      >
        <div
          aria-label={`${direction} arrow`}
          onClick={() => onClick(direction)}
          role="button"
          tabIndex={0}
          className={classNames(
            'sg-rounded-full',
            'sg-bg-white',
            'sg-bg-opacity-70',
            'sg-relative',
            'sg-hover:bg-opacity-100',
            'sg-flex',
            'sg-justify-center',
            'sg-items-center',
            {
              'sg-transform sg--translate-y-18px sm:sg--translate-y-23px': hasAdjustedPosition
            }
          )}
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
    </CSSTransition>
  );
};