import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../services/userSlice';
import {
  burgerConstructorSelector,
  removeConstructor
} from '../../services/burgerConstructorSlice';
import {
  deleteOrder,
  newOrder,
  orderLoadingSelector,
  orderSelector
} from '../../services/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const constructorElements = useSelector(burgerConstructorSelector);

  const orderRequest = useSelector(orderLoadingSelector);

  const orderModalData = useSelector(orderSelector);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorElements.bun || orderRequest) return;

    const itemId = [
      constructorElements.bun._id,
      ...constructorElements.ingredients.map((elem) => elem._id),
      constructorElements.bun._id
    ];
    dispatch(newOrder(itemId));
  };
  const closeOrderModal = () => {
    dispatch(removeConstructor());
    dispatch(deleteOrder());
  };

  const price = useMemo(
    () =>
      (constructorElements.bun ? constructorElements.bun.price * 2 : 0) +
      constructorElements.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorElements]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorElements}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
