import { useState, useRef, useEffect, FC, SyntheticEvent } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useDispatch } from 'react-redux';
import {
  ingredientsSelector,
  productReducer
} from '../../services/productSlice';
import { useSelector } from '../../services/store';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const products = useSelector(ingredientsSelector);

  const buns = products.filter((ingredient) => ingredient.type === 'bun');
  const mains = products.filter((ingredient) => ingredient.type === 'main');
  const sauces = products.filter((ingredient) => ingredient.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
