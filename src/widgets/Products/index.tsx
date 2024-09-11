import React, { useEffect, useState } from 'react';
import cls from './Products.module.scss';
import clsx from 'clsx';
import { AbridgedCard } from '../../features/Card';
import { useProducts } from '../../app/hooks/useProducts';
import { LoadButton } from '../../shared/LoadButton';
import { useCardsPerPage } from '../../app/hooks/useCardsPerPage';
import { DataRenderer } from '../../features/DataRenderer';
import { CardLoader } from '../../features/Card/CardLoader';
import { useLoadMore } from '../../app/hooks/useLoadMore';
import { CardProps } from '../../features/Card/context/types';
import { Filter } from '../../features/Filter';
import Icon from '../../shared/Icon';
import { useSelector } from 'react-redux';
import {
  selectFilterCategory,
  selectFilterSection,
  selectFilterShowcase,
} from '../../app/redux/filters/selectors';
import { Mods } from '../../app/@types/types';

export const Products: React.FC = () => {
  const productsPerPage = useCardsPerPage();
  const [page, setPage] = useState<number>(1);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggleBoxRef = React.useRef<HTMLDivElement>(null);

  const { products, meta, status, isFilterChanged } = useProducts(page, productsPerPage);

  const {
    resetFilters,
    loadedCards: loadedProducts,
    handleLoadButtonClick,
  } = useLoadMore<CardProps>({
    cards: products,
    meta,
    page,
    setPage,
  });

  useEffect(() => {
    resetFilters();
  }, [resetFilters, isFilterChanged]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (toggleBoxRef.current) {
      toggleBoxRef.current.style.height = isOpen ? `${toggleBoxRef.current.scrollHeight}px` : '0px';
    }
  }, [isOpen, products]);

  const showcase = useSelector(selectFilterShowcase);
  const category = useSelector(selectFilterCategory);
  const section = useSelector(selectFilterSection);

  const accordeonMods: Mods = {
    [cls.products_accordeon_opened]: isOpen,
  };

  return (
    <div className={cls.products}>
      <div className="container">
        <div className={cls.products_head}>
          <h1 className={clsx(cls.products_title, 'h-1')}>Товары</h1>
          <Filter />
        </div>
        <div className={cls.products_accordeon} onClick={handleToggle}>
          <div className={cls.products_accordeonInfo}>
            {showcase.length ? showcase : 'Витрина'} / {category.length ? category : 'Категория'} /{' '}
            {section.length ? section : 'Раздел'}
          </div>
          <div className={clsx(cls.products_accordeonArrow, accordeonMods)}>
            <Icon.Up />
          </div>
        </div>
        <div className={clsx(cls.products_toggleBox, accordeonMods)}>
          <DataRenderer<CardProps>
            data={loadedProducts}
            status={status}
            LoadingComponent={CardLoader}
            CardComponent={AbridgedCard}
            emptyMessage="Нет товаров с такими фильтрами"
            containerClassName={cls.products_cards}
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
