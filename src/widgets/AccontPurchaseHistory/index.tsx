import React from 'react';
import cls from './AccontPurchaseHistory.module.scss';
import { AbridgedCard } from '../../features/Card';
import { useAppDispatch } from '../../app/redux/store';
import { useSelector } from 'react-redux';
import { fetchOrders } from '../../app/redux/orders/thunks';
import { selectOrders, selectOrdersStatus } from '../../app/redux/orders/selectors';
import { useLoadMore } from '../../app/hooks/useLoadMore';
import { useCardsPerPage } from '../../app/hooks/useCardsPerPage';
import { CardProps } from '../../features/Card/context/types';
import { DataRenderer } from '../../features/DataRenderer';
import { LoadButton } from '../../shared/LoadButton';
import { CardLoader } from '../../features/Card/CardLoader';
import clsx from 'clsx';

export const AccontPurchaseHistory: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);

  const dispatch = useAppDispatch();
  const cardsPerPage = useCardsPerPage();

  const { items, meta } = useSelector(selectOrders);
  const status = useSelector(selectOrdersStatus);

  const { loadedCards: loadedReviews, handleLoadButtonClick } = useLoadMore<CardProps>({
    cards: items,
    meta,
    page,
    setPage,
  });

  React.useEffect(() => {
    dispatch(fetchOrders({ page, limit: cardsPerPage - 1 }));
  }, [page, cardsPerPage]);

  return (
    <div className={cls.accontPurchaseHistory}>
      <div className="container">
        <div className={cls.accontPurchaseHistory_inner}>
          <div className={clsx(cls.accontPurchaseHistory_title, 'h-1')}>История покупок</div>
          <DataRenderer<CardProps>
            data={loadedReviews}
            status={status}
            LoadingComponent={CardLoader}
            CardComponent={AbridgedCard}
            emptyMessage="Вы пока ничего не покупали"
            containerClassName={cls.accontPurchaseHistory_box}
          />
          <LoadButton
            currentPage={meta.current_page}
            totalPages={meta.total_pages}
            onClick={handleLoadButtonClick}
          />
        </div>
      </div>
    </div>
  );
};
