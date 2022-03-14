import { useEffect, useState } from 'react';
import { Client } from '../../../tools/client';
import { StartedLoading } from '../StartedLoading';
import { StartedAddon } from './StartedAddon';

export const StartedAddonList = ({
  addons,
  setAddons,
  selectedAddons,
  setSelectedAddons,
}) => {
  const [loading, setLoading] = useState(true);
  const getAddons = () => {
    const isAddon = (addon) =>
      !addon.name.includes('마이세이프') && !addon.name.includes('마이케어');

    Client.get('/addons')
      .then(({ data }) => setAddons(data.addons.filter(isAddon)))
      .finally(() => setLoading(false));
  };

  useEffect(getAddons, [setAddons]);
  const onSelect = (addon) => () =>
    setSelectedAddons((selectedAddons) => {
      const exists = selectedAddons.includes(addon);
      if (exists) return selectedAddons.filter((a) => a !== addon);
      return [...selectedAddons, addon];
    });

  return (
    <div>
      {!loading ? (
        addons.map((addon) => (
          <StartedAddon
            addon={addon}
            key={addon.addonId}
            selectedAddons={selectedAddons}
            onSelect={onSelect(addon)}
          />
        ))
      ) : (
        <StartedLoading>
          고객님께 맞는 최적의 상품을 찾고 있습니다.
        </StartedLoading>
      )}
    </div>
  );
};
