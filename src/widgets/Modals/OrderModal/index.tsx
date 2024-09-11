import React, { useContext, useEffect } from 'react';
import { ELoadingStatus, ELocation, Mods } from '../../../app/@types/types';
import clsx from 'clsx';
import cls from './OrderModal.module.scss';
import { ModalWrapper } from '..';
import { useCopyToClipboard } from '../../../app/hooks/useCopyToClipboard';
import { TDefaultProps } from '../types';
import Icon from '../../../shared/Icon';
import { CardContext } from '../../../features/Card/context/context';
import { formatPaymentDate } from '../../../app/utils/formatPaymentDate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/redux/store';
import { postOrder } from '../../../app/redux/orders/thunks';
import { useSelector } from 'react-redux';
import { selectOrderPaymentStatus } from '../../../app/redux/orders/selectors';

export type OrderModalProps = TDefaultProps & {
  orderID: number;
  wallet: string;
  count: number;
};

const orderStatusText = (orderStatus: ELoadingStatus) => {
  switch (orderStatus) {
    case ELoadingStatus.fulfilled:
      return 'Оплачено';
    case ELoadingStatus.loading:
      return 'Оплата';
    case ELoadingStatus.rejected:
      return 'Отказано';
    default:
      return 'Отказано';
  }
};

export const OrderModal: React.FC<OrderModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const orderStaus = useSelector(selectOrderPaymentStatus);

  const { orderID, count, wallet, onRequestClose, isOpen } = props;
  const { isCopied, isButtonDisabled, copyToClipboard } = useCopyToClipboard();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    cardData: { id: productId, name, price },
  } = useContext(CardContext);

  const mods: Mods = {
    [cls.orderPayed]: orderStaus === ELoadingStatus.fulfilled,
    [cls.orderWarning]: orderStaus === ELoadingStatus.loading,
    [cls.orderFail]: orderStaus === ELoadingStatus.rejected,
  };

  const handleCopyClick = () => {
    copyToClipboard(wallet);
  };

  const handleFooterButtonClick = () => {
    pathname !== ELocation.home && navigate(ELocation.home);
    onRequestClose();
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(
          postOrder({
            productId,
            count,
            date: Date.now(),
          }),
        );
      }, 100);
    }
  }, [isOpen]);

  return (
    <ModalWrapper
      {...props}
      content={
        <div className={cls.orderModal}>
          <div className={cls.orderModal_title}>Заказ #{orderID}</div>
          <div className={clsx(cls.orderModal_status, mods)}>{orderStatusText(orderStaus)}</div>
          <div className={cls.orderModal_details}>
            <div className={cls.orderModal_detailsTitle}>Реквизиты для перевода:</div>
            <div className={cls.orderModal_detailsField}>
              <input
                type="text"
                value={wallet}
                disabled={true}
                className={cls.orderModal_detailsInput}
              />
              <button disabled={isButtonDisabled} onClick={handleCopyClick}>
                {isCopied ? <Icon.Checked /> : <Icon.Copy />}
              </button>
            </div>
            <div className={cls.orderModal_value}>
              <span>К оплате</span>
              <span></span>
              <span>{price * count} ₽</span>
            </div>
          </div>
          <div className={cls.orderModal_box}>
            <div className={cls.orderModal_value}>
              <span>Номер заказа</span>
              <span></span>
              <span>9681</span>
            </div>
            <div className={cls.orderModal_value}>
              <span>TxID</span>
              <span></span>
              <span>a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d</span>
            </div>
            <div className={cls.orderModal_value}>
              <span>Наименование</span>
              <span></span>
              <span>{name}</span>
            </div>
            <div className={cls.orderModal_value}>
              <span>Количество</span>
              <span></span>
              <span>{count} шт</span>
            </div>
            <div className={cls.orderModal_value}>
              <span>Дата</span>
              <span></span>
              <span>{formatPaymentDate(new Date())}</span>
            </div>
          </div>
          <button onClick={handleFooterButtonClick} className={clsx(cls.orderModal_button, 'link')}>
            {orderStaus === ELoadingStatus.fulfilled ? 'На главную' : 'Отменить покупку'}
          </button>
        </div>
      }
    />
  );
};
