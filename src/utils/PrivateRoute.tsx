import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedState, tokenState } from '../recoil/users/atoms/atoms';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }): JSX.Element => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const token = useRecoilValue(tokenState);

  return isAuthenticated || token ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
