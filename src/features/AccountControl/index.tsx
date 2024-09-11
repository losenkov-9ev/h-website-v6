import React, { useReducer, useState, useCallback } from 'react';
import cls from './AccountControl.module.scss';

import { Input } from '../../shared/Input';
import { Button } from '../../shared/Button';
import { ConfirmModal } from '../../widgets/Modals/ConfirmModal';
import Select from '../../shared/Select';

import { reducer } from './state/reducer';
import { initialState } from './state/initialState';
import { AccountControlProps, AccountControlType } from './types/types';
import { setPaymentCurrency } from './state/actions';
import { content } from './content';
import { handleChange } from './types/handlers';

export const AccountControl: React.FC<AccountControlProps> = ({ type }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const canOpenModal = useCallback((): boolean => {
    if (type === AccountControlType.Balance) {
      return state.payment.value > 0 && state.payment.currency !== '';
    }
    return state.password.oldPassword !== '' && state.password.newPassword !== '';
  }, [state.payment, state.password, type]);

  const handleOpenModal = useCallback(() => {
    if (canOpenModal()) {
      setIsConfirmModalOpen(true);
    }
  }, [canOpenModal]);

  const handleSelectChange = useCallback(
    (currency: string | React.ReactNode) => {
      dispatch(setPaymentCurrency(currency as string));
    },
    [dispatch],
  );

  const handleCloseModal = useCallback(() => {
    setIsConfirmModalOpen(false);
  }, []);

  const renderInputs = () => {
    if (type === AccountControlType.Password) {
      return (
        <>
          <Input
            onChange={(e) => handleChange(e, state, dispatch, type, 'oldPassword')}
            placeholder="Старый пароль"
            isPassword
          />
          <Input
            onChange={(e) => handleChange(e, state, dispatch, type, 'newPassword')}
            placeholder="Новый пароль"
            isPassword
          />
        </>
      );
    }
    return (
      <>
        <Input
          onChange={(e) => handleChange(e, state, dispatch, type, 'value')}
          placeholder="Сумма"
          type="number"
        />
        <Select onChange={handleSelectChange} placeholder="Валюта" fullWidth>
          <Select.Option value="btc">BTC</Select.Option>
          <Select.Option value="usdt">USDT</Select.Option>
          <Select.Option value="eth">ETH</Select.Option>
        </Select>
      </>
    );
  };

  return (
    <>
      <div className={cls.accountControl}>
        <div className={cls.accountControl_title}>{content[type].title}</div>
        <div className={cls.accountControl_box}>{renderInputs()}</div>
        <Button onClick={handleOpenModal}>{content[type].button}</Button>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onRequestClose={handleCloseModal}
        title={content[type].modalTitle(state.payment)}
        buttonContent={content[type].modalButton}
      />
    </>
  );
};
