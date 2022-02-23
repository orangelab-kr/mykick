import { useEffect, useState } from 'react';
import { Client } from './client';

const cachePricings = {};
export const usePricing = (pricingId, { clearCache } = {}) => {
  const [rent, setPricing] = useState();

  const load = () => {
    const cachedRent = cachePricings[pricingId];
    if (!clearCache && cachedRent) return setPricing(cachedRent);
    const updatePricing = ({ data }) => {
      cachePricings[pricingId] = data.pricing;
      setPricing(cachePricings[pricingId]);
    };

    Client.get(`/pricings/${pricingId}`, { alert: false })
      .then(updatePricing)
      .catch(() => setPricing(null));
  };

  useEffect(load, [clearCache, pricingId]);
  return rent;
};
