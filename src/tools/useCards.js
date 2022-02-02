import { useState } from 'react';
import { useEffect } from 'react';
import { Client } from './client';

let cachedCards;
export const useCards = ({ clearCache }) => {
  const [cards, setCards] = useState();
  useEffect(() => {
    if (!clearCache && cachedCards) return setCards(cachedCards);
    const updateCards = ({ data }) => {
      cachedCards = data.cards;
      setCards(cachedCards);
    };

    Client.get('/cards', { alert: false })
      .then(updateCards)
      .catch(() => setCards(null));
  }, [clearCache]);

  return cards;
};
