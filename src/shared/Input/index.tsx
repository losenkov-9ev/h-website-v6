import React, { forwardRef } from 'react';
import cls from './Input.module.scss';
import clsx from 'clsx';
import { Mods } from '../../app/@types/types';
import Icon from '../Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  isPassword?: boolean;
  type?: HTMLInputElement['type'];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      isPassword = false,
      type = 'text',
      onChange,
      isError = false,
      errorMessage,
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      onChange && onChange(event);
    };

    const mods: Mods = {
      [cls.input_error]: isError,
    };

    return (
      <div className={clsx(cls.input, mods)}>
        <input
          ref={ref}
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          className={clsx(cls.input_field, 'd-input')}
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          {...rest} // Spread the remaining props (e.g., onBlur, onFocus) to the input element
        />
        {isPassword && (
          <button type="button" className={cls.input_button} onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <Icon.HidePassword /> : <Icon.ShowPassword />}
          </button>
        )}
        {isError && errorMessage && <div className={cls.input_error_message}>{errorMessage}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';
