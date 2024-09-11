import React from 'react';
import cls from './Banner.module.scss';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../app/redux/theme/selectors';
import clsx from 'clsx';

export const Banner: React.FC = () => {
  const { theme } = useSelector(selectTheme);

  return (
    <div className={cls.banner}>
      <div className="container">
        <div className={cls.banner_item} style={{ backgroundImage: `url('/banner-${theme}.svg')` }}>
          <h2 className={clsx(cls.banner_title, 'h-1')}>Заголовок 800px</h2>
          <p className={cls.banner_text}>
            Lorem ipsum dolor sit amet consectetur. Gravida massa egestas id non convallis egestas
            sed. Sit viverra nibh egestas dictum tincidunt natoque sit gravida accumsan. Nunc
            facilisi vitae aliquam ornare proin fermentum. Suspendisse congue egestas sed
            scelerisque lorem.
          </p>
        </div>
      </div>
    </div>
  );
};
