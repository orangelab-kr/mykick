import { useEffect, useState } from 'react';
import { Client } from './client';
import { useInterval } from './useInterval';

let cachedRents;
export const useRents = ({ clearCache, params } = {}) => {
  const [rents, setRents] = useState();
  useEffect(() => {
    if (!clearCache && cachedRents) return setRents(cachedRents);
    const updateRents = ({ data }) => {
      cachedRents = data.rents;
      setRents(cachedRents);
    };

    Client.get('/rents', { alert: false, params })
      .then(updateRents)
      .catch(() => setRents(null));
  }, [clearCache, params]);

  return rents;
};

const secondaryCacheRents = {};
export const useRent = (rentId, { clearCache, realtime } = {}) => {
  const [rent, setRent] = useState();

  const load = () => {
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
  };

  useInterval(load, realtime ? 10000 : null);
  useEffect(load, [clearCache, rentId]);

  return rent;
};

export const useRentStatus = (rentId, { realtime } = {}) => {
  const [status, setStatus] = useState();

  const load = () =>
    Client.get(`/rents/${rentId}/status`, { alert: false })
      .then(({ data }) => setStatus(data.status))
      .catch(() => setStatus(null));

  useInterval(load, realtime ? 10000 : null);
  useEffect(load, [rentId]);

  return status;
};
