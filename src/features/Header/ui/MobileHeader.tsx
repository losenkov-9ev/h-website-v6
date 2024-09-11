import clsx from 'clsx';
import cls from '../Header.module.scss';
import { MobileHeaderProps } from '../types';
import { ThemeToggler } from '../../../shared/ThemeToggler';
import { Link } from 'react-router-dom';
import { ELocation, Mods } from '../../../app/@types/types';
import { Button } from '../../../shared/Button';
import { EFormType } from '../../../widgets/Modals/FormModal';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../app/redux/auth/selectors';
import { UserControls } from './UserControls';
import Icon from '../../../shared/Icon';

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
  onOpenModal,
}) => {
  const isAuthorized = useSelector(selectIsAuth);

  const mods: Mods = {
    [cls.headerMenu_footer_authorized]: isAuthorized,
  };

  return (
    <>
      <div className={cls.headerMobile}>
        <div className={clsx(cls.headerMobile_inner, 'container')}>
          <ThemeToggler />
          <Link to={ELocation.home} className={cls.headerMobile_logo}>
            <Icon.LogoMobile />
          </Link>
          <button onClick={onToggleMenu} className={cls.headerMobile_button}>
            <Icon.Burger />
          </button>
        </div>
      </div>
      <div className={clsx(cls.headerMenu, { [cls.opened]: isMenuOpen })}>
        <div className={cls.headerMenu_box}>
          <Link className={cls.headerMenu_link} to={ELocation.home}>
            Товары
          </Link>
          <Link className={cls.headerMenu_link} to={ELocation.reviews}>
            Отзывы
          </Link>
          <Link className={cls.headerMenu_link} to={ELocation.home}>
            Ваша ссылка
          </Link>
          <Link className={cls.headerMenu_link} to={ELocation.home}>
            Ваша ссылка
          </Link>
        </div>
        <div className={clsx(cls.headerMenu_footer, mods)}>
          {!isAuthorized ? (
            <>
              <Button onClick={() => onOpenModal(EFormType.SignIn)}>
                <Icon.SignIn />
                Войти
              </Button>
              <button className="link" onClick={() => onOpenModal(EFormType.SignUp)}>
                <Icon.SignUp />
                Создать аккаунт
              </button>
            </>
          ) : (
            <UserControls />
          )}
        </div>
      </div>
    </>
  );
};
