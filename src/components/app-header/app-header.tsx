import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelector } from '../../services/userSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(userSelector)?.name} />
);
