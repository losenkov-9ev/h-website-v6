import React from 'react';
import cls from './ConfirmModal.module.scss';
import { ModalWrapper } from '..';
import { Button } from '../../../shared/Button';
import { TDefaultProps } from '../types';

export type ConfirmModalProps = TDefaultProps & {
  title: string;
  buttonContent: string;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { title, buttonContent, onRequestClose } = props;

  return (
    <ModalWrapper
      {...props}
      content={
        <div className={cls.confirmModal}>
          <div className={cls.confirmModal_title}>{title}</div>
          <div className={cls.confirmModal_buttons}>
            <Button>{buttonContent}</Button>
            <button className="link" onClick={onRequestClose}>
              Отмена
            </button>
          </div>
        </div>
      }
    />
  );
};
