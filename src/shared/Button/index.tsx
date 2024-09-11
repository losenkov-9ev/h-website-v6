import React from 'react';
import cls from './Button.module.scss';

import clsx from 'clsx';
import { Mods } from '../../app/@types/types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  isNotCetered?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  fullWidth = true,
  isNotCetered = false,
  onClick,
  type = 'button',
}) => {
  const mods: Mods = {
    [cls.button_fullWidth]: fullWidth,
    [cls.button_notCetered]: isNotCetered,
  };

  return (
    <button type={type} onClick={onClick} className={clsx(cls.button, mods, [className])}>
      {children}
    </button>
  );
};
