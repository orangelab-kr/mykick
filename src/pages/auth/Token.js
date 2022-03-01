import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';
import { StartedLoading } from '../../components/started/StartedLoading';
import { Client } from '../../tools/client';
import { useUser } from '../../tools/useUser';

export const Token = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [code] = useQueryParam('code', StringParam);
  const [url] = useQueryParam('url', StringParam);
  const gotoURL = useCallback(() => navigate(url), [navigate, url]);
  const loginWithToken = useCallback(() => {
    if (!code) return navigate('/auth/signin');
    Client.get('/auth/token', { params: { code } })
      .finally(() => navigate('/auth/signin'))
      .then((r) => localStorage.setItem('mykick-token', r.data.token))
      .then(gotoURL);
  }, [code, gotoURL, navigate]);

  useEffect(() => {
    if (user === undefined) return;
    if (user !== null) return gotoURL();
    loginWithToken();
  }, [gotoURL, loginWithToken, user]);

  return (
    <div style={{ marginTop: '10em' }}>
      <StartedLoading>본인임을 확인하고 있습니다.</StartedLoading>
    </div>
  );
};
