import { useEffect, useState } from 'react';
import { Client } from '../../../tools/client';
import { StartedLoading } from '../StartedLoading';
import { StartedPricing } from './StartedPricing';

export const StartedPricingList = ({ selectedPricing, setPricing }) => {
  const [loading, setLoading] = useState(true);
  const [pricings, setPricings] = useState([]);

  const getPricings = () => {
    Client.get('/pricings')
      .then(({ data }) => setPricings(data.pricings))
      .finally(() => setLoading(false));
  };

  useEffect(getPricings, []);
  if (loading) {
    return (
      <StartedLoading loading={loading}>
        고객님께 맞는 최적의 상품을 찾고 있습니다.
      </StartedLoading>
    );
  }

  const onSelect = (pricing) => () => {
    if (selectedPricing === pricing) return setPricing();
    setPricing(pricing);
  };

  return (
    <div>
      {pricings.map((pricing) => (
        <StartedPricing
          pricing={pricing}
          key={pricing.pricingId}
          selectedPricing={selectedPricing}
          onSelect={onSelect(pricing)}
        />
      ))}
    </div>
  );
};
