import { useEffect, useState } from 'react';
import { Client } from './client';

let cachedRents;
export const useRents = ({ clearCache } = {}) => {
  const [rents, setRents] = useState();
  useEffect(() => {
    if (!clearCache && cachedRents) return setRents(cachedRents);
    const updateRents = ({ data }) => {
      cachedRents = data.rents;
      setRents(cachedRents);
    };

    Client.get('/rents', { alert: false })
      .then(updateRents)
      .catch(() => setRents(null));
  }, [clearCache]);

  return rents;
};

const secondaryCacheRents = {};
export const useRent = (rentId, { clearCache } = {}) => {
  const [rent, setRent] = useState();

  useEffect(() => {
    const getRentFromCache = () =>
      secondaryCacheRents[rentId] ||
      (cachedRents && cachedRents.find((rent) => rent.rentId === rentId));

    const cachedRent = getRentFromCache();
    if (!clearCache && cachedRent) return setRent(cachedRent);
    const updateRent = ({ data }) => {
      secondaryCacheRents[rentId] = data.rent;
      setRent(secondaryCacheRents[rentId]);
    };

    Client.get(`/rents/${rentId}`, { alert: false })
      .then(updateRent)
      .catch(() => setRent(null));
  }, [clearCache, rentId]);
  return rent;
};
