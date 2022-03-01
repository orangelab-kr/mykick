import { Navigate } from 'react-router-dom';
import { useUser } from '../tools/useUser';
import { StartedLoading } from './started/StartedLoading';

export const LoginCheck = () => {
  const user = useUser();
  if (user === undefined) return <StartedLoading />;
  if (user === null) return <Navigate to='/started' />;
  if (user) return <Navigate to='/rents' />;
};
