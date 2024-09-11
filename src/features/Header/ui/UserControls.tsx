import cls from '../Header.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/redux/auth/selectors';
import { useAppDispatch } from '../../../app/redux/store';
import { logout } from '../../../app/redux/auth/slice';
import { ELocation } from '../../../app/@types/types';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/Icon';
import { useWindowWidth } from '../../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../../app/constants';
import { Button } from '../../../shared/Button';

export const UserControls: React.FC = () => {
  const data = useSelector(selectUser);
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const isMobileHeader = useWindowWidth(DEFAULT_SCREEN_WIDTH.L);
  const isVisibleName = !useWindowWidth(DEFAULT_SCREEN_WIDTH.XL);

  const handleLogout = () => {
    dispath(logout());
    window.localStorage.removeItem('token');
  };

  return !isMobileHeader ? (
    <div className={cls.header_controls}>
      <span>
        {isVisibleName && 'Баланс: '} {data.balance ? data.balance : 0} ₽
      </span>
      <Link to={ELocation.profile} className="link">
        <Icon.SignIn />
        {isVisibleName && (data.email ? data.email : '...')}
      </Link>
      <button onClick={handleLogout} className="link">
        <Icon.Logout />
      </button>
    </div>
  ) : (
    <>
      <Button onClick={handleLogout} className="link">
        <Icon.Logout />
      </Button>
      <Button onClick={() => navigate(ELocation.profile)} className="link">
        <Icon.SignIn />
        {data.email ? data.email : '...'}
      </Button>
      <span>Баланс: {data.balance ? data.balance : 0} ₽</span>
    </>
  );
};
