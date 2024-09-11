import { DEFAULT_SCREEN_WIDTH } from '../../../app/constants';
import { useWindowWidth } from '../../../app/hooks/useWindowWidth';
import { AuthButtonProps } from '../types';

export const AuthButton: React.FC<AuthButtonProps> = ({ type, onClick, label, icon }) => {
  const isVisibleName = !useWindowWidth(DEFAULT_SCREEN_WIDTH.XL);

  return (
    <button onClick={() => onClick(type)} className="link" data-type={type}>
      {icon}
      {isVisibleName && label}
    </button>
  );
};
