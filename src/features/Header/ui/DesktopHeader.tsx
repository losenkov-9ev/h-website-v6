import { HeaderProps } from '../types';
import cls from '../Header.module.scss';
import Icon from '../../../shared/Icon';
import { Link } from 'react-router-dom';
import { ELoadingStatus, ELocation } from '../../../app/@types/types';
import { UserControls } from './UserControls';
import { AuthButton } from './AuthButton';
import { EFormType } from '../../../widgets/Modals/FormModal';
import { HeaderSkeleton } from './HeaderSkeleton';
import { ThemeToggler } from '../../../shared/ThemeToggler';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectStatus } from '../../../app/redux/auth/selectors';

export const DesktopHeader: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const isAuthorized = useSelector(selectIsAuth);
  const authStatus = useSelector(selectStatus);

  return (
    <div className={cls.header}>
      <Link to={ELocation.home} className={cls.header_logo}>
        <Icon.Logo />
      </Link>
      <div className={cls.header_menu}>
        <Link to={ELocation.home} className={cls.header_menuLink}>
          Товары
        </Link>
        <Link to={ELocation.reviews} className={cls.header_menuLink}>
          Отзывы
        </Link>
        <div className={cls.header_divider}></div>
        <Link to={ELocation.home} className={cls.header_menuLink}>
          Ваша ссылка
        </Link>
        <Link to={ELocation.home} className={cls.header_menuLink}>
          Ваша ссылка
        </Link>
        <div className={cls.header_divider}></div>
        <ThemeToggler />
        {authStatus === ELoadingStatus.loading ? (
          <HeaderSkeleton />
        ) : !isAuthorized ? (
          <div className={cls.header_controls}>
            <AuthButton
              type={EFormType.SignIn}
              onClick={onOpenModal}
              label="Вход"
              icon={<Icon.SignIn />}
            />
            <AuthButton
              type={EFormType.SignUp}
              onClick={onOpenModal}
              label="Регистрация"
              icon={<Icon.SignUp />}
            />
          </div>
        ) : (
          <UserControls />
        )}
      </div>
    </div>
  );
};
