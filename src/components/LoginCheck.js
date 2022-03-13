import { Navigate } from 'react-router-dom';
import { useUser } from '../tools/useUser';
import { StartedLoading } from './started/StartedLoading';
import { StringParam, useQueryParam } from 'use-query-params';
import { useStorage } from '../tools/storage';

export const LoginCheck = () => {
  const user = useUser();
  const storage = useStorage('general');
  const [providerCode] = useQueryParam('c', StringParam);
  storage.set('providerCode', providerCode);
  if (user === undefined) return <StartedLoading />;
  if (user === null) return <Navigate to='/started' />;
  if (user) return <Navigate to='/rents' />;
};
