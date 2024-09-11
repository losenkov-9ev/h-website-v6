import React from 'react';
import { useAppDispatch } from '../../app/redux/store';
import { useCardsPerPage } from '../../app/hooks/useCardsPerPage';
import { useSelector } from 'react-redux';
import { selectReviews, selectReviewsStatus } from '../../app/redux/reviews/selectors';
import { useLoadMore } from '../../app/hooks/useLoadMore';
import { ReviewCard, ReviewCardProps } from '../../features/ReviewCard';
import { fetchReviews } from '../../app/redux/reviews/thunks';

import cls from './Reviews.module.scss';
import { DataRenderer } from '../../features/DataRenderer';
import { ReviewCardLoader } from '../../features/ReviewCard/ReviewCardLoader';
import { LoadButton } from '../../shared/LoadButton';
import clsx from 'clsx';
import { ReviewsProvider } from './context/provider';

export interface ReviewsProps {
  title?: string;
  type?: 'default' | 'masonry';
}

export const Reviews: React.FC<ReviewsProps> = ({ title = '', type = 'default' }) => {
  const [page, setPage] = React.useState<number>(1);

  const dispatch = useAppDispatch();
  const cardsPerPage = useCardsPerPage();

  const { items, meta } = useSelector(selectReviews);
  const status = useSelector(selectReviewsStatus);

  const { loadedCards: loadedReviews, handleLoadButtonClick } = useLoadMore<ReviewCardProps>({
    cards: items,
    meta,
    page,
    setPage,
  });

  React.useEffect(() => {
    dispatch(fetchReviews({ page, limit: cardsPerPage }));
  }, [page, cardsPerPage]);

  return (
    <ReviewsProvider title={title} type={type}>
      <div className={cls.reviews}>
        <div className="container">
          {title && <div className={clsx(cls.reviews_title, 'h-1')}>{title}</div>}
          <DataRenderer<ReviewCardProps>
            data={loadedReviews}
            status={status}
            LoadingComponent={ReviewCardLoader}
            CardComponent={ReviewCard}
            emptyMessage="У продавца нет отзывов"
            containerClassName={type === 'default' ? cls.reviews_box : cls.reviews_masonry}
            isMasonry={type === 'masonry'}
          />
          <LoadButton
            currentPage={meta.current_page}
            totalPages={meta.total_pages}
            onClick={handleLoadButtonClick}
          />
        </div>
      </div>
    </ReviewsProvider>
  );
};
