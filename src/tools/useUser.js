import { useState } from 'react';
import { useEffect } from 'react';
import { Client } from './client';

let cachedUser;
export const useUser = ({ clearCache } = {}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (!clearCache && cachedUser) return setUser(cachedUser);
    const updateUser = ({ data }) => {
      cachedUser = data.user;
      setUser(cachedUser);
    };

    Client.get('/auth', { alert: false })
      .then(updateUser)
      .catch(() => setUser(null));
  }, [clearCache]);

  return user;
};
