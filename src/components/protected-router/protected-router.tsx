import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { isAuthSelector, userSelector } from '../../services/userSlice';

type ProtectedRouteProps = {
  children?: React.ReactElement;
  onlyUnAuth?: boolean;
};
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userSelector);
  const isAuth = useSelector(isAuthSelector);
  const location = useLocation();

  if (!isAuth) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from ?? { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
