import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, userOrdersSelector } from '../../services/userSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
