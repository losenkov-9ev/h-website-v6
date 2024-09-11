import React from 'react';
import styles from './Rate.module.scss';

import clsx from 'clsx';
import { Mods } from '../../app/@types/types';
import Icon from '../Icon';

interface RateProps {
  value: number;
}

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => {
  const mods: Mods = {
    [styles.filled]: filled,
    [styles.notFilled]: !filled,
  };

  return <Icon.RateStar className={clsx(styles.star, mods)} />;
};

export const Rate: React.FC<RateProps> = ({ value }) => {
  return (
    <div className={styles.rateContainer}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} filled={index < value} />
      ))}
    </div>
  );
};
