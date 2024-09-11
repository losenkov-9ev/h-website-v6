import React from 'react';

import { useAppDispatch } from '../../app/redux/store';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../app/redux/theme/selectors';
import { ETheme } from '../../app/redux/theme/types';
import { switchTheme } from '../../app/redux/theme/slice';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';
import Icon from '../Icon';

import cls from './ThemeToggler.module.scss';
import clsx from 'clsx';

export const ThemeToggler: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useSelector(selectTheme);

  const isVisibleName = !useWindowWidth(DEFAULT_SCREEN_WIDTH.XL);

  const handleThemeChange = () => {
    theme === ETheme.light
      ? dispatch(switchTheme(ETheme.dark))
      : dispatch(switchTheme(ETheme.light));
  };
  // TODO: Сдлеать фиксированную ширину иконки
  // TODO: Покрасить ссылки
  return (
    <button className={clsx(cls.themeToggler, 'link')} onClick={handleThemeChange}>
      {theme === ETheme.dark ? (
        <>
          <div className={cls.themeToggler_icon}>
            <Icon.ThemeLight />
          </div>
          {isVisibleName && <>Светлая</>}
        </>
      ) : (
        <>
          <div className={cls.themeToggler_icon}>
            <Icon.ThemeDark />
          </div>
          {isVisibleName && <>Темная</>}
        </>
      )}
    </button>
  );
};
