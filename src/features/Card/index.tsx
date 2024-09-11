import { useContext } from 'react';
import { CardContext } from './context/context';
import cls from './Card.module.scss';
import { AbridgedCardProps, CardProps, isCardProps } from './context/types';
import { CardProvider } from './context/Provider';
import { PaymentModal } from '../../widgets/Modals/PaymentModal';
import { Button } from '../../shared/Button';
import { formatPaymentDate } from '../../app/utils/formatPaymentDate';
import { Mods } from '../../app/@types/types';
import clsx from 'clsx';
import { useWindowWidth } from '../../app/hooks/useWindowWidth';
import { DEFAULT_SCREEN_WIDTH } from '../../app/constants';
import Icon from '../../shared/Icon';

export interface CardContentProps {
  type: 'abridged' | 'normal';
}

const CardContent: React.FC<CardContentProps> = ({ type }) => {
  const { openModal, cardData } = useContext(CardContext);
  const { name, price } = cardData;
  const isMobile = useWindowWidth(DEFAULT_SCREEN_WIDTH.S);

  const mods: Mods = {
    [cls.card_abridged]: type === 'abridged',
  };

  return (
    <>
      <div className={clsx(cls.card, mods)}>
        {isCardProps(cardData) ? (
          <div className={cls.card_head}>
            <div className={cls.card_breadcrumbs}>
              <span>{cardData.showcase}</span>
              <span> / </span>
              <span>{cardData.category}</span>
              <span> / </span>
              <span>{cardData.section}</span>
            </div>
            <div className={cls.card_title}>{name}</div>
          </div>
        ) : (
          <div className={cls.card_title}>{name}</div>
        )}

        {isCardProps(cardData) && (
          <div className={cls.card_image}>
            <img src={cardData.image} alt="" />
          </div>
        )}

        <div className={cls.card_footer}>
          <div className={cls.card_price}>{price} ₽</div>
          {cardData.date ? (
            <div className={cls.card_date}>{formatPaymentDate(cardData.date)}</div>
          ) : (
            <Button
              className={cls.card_button}
              fullWidth={!isMobile}
              isNotCetered={isMobile}
              onClick={openModal}>
              {!isMobile ? 'Купить' : <Icon.Cart />}
            </Button>
          )}
        </div>
      </div>
      <PaymentModal />
    </>
  );
};

export const Card: React.FC<CardProps> = (props) => {
  return (
    <CardProvider cardData={props}>
      <CardContent type="normal" />
    </CardProvider>
  );
};

export const AbridgedCard: React.FC<AbridgedCardProps> = (props) => {
  return (
    <CardProvider cardData={props}>
      <CardContent type="abridged" />
    </CardProvider>
  );
};
