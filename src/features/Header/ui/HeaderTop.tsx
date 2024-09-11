import cls from '../Header.module.scss';
import { ThemeToggler } from '../../../shared/ThemeToggler';
import { EFormType } from '../../../widgets/Modals/FormModal';
import { HeaderProps } from '../types';
import { AuthButton } from './AuthButton';
import { UserControls } from './UserControls';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectStatus } from '../../../app/redux/auth/selectors';
import { HeaderSkeleton } from './HeaderSkeleton';
import Icon from '../../../shared/Icon';
import { ELoadingStatus } from '../../../app/@types/types';

export const HeaderTop: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const isAuthorized = useSelector(selectIsAuth);
  const authStatus = useSelector(selectStatus);

  return (
    <div className={cls.header_top}>
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
  );
};
