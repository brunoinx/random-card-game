import { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { Button } from '../../components/Button';
import { Card, CardProps } from '../../components/Card';

import { inputNameKey } from '../../storage/keys';
import { nameCardSwitch } from '../../utils/nameCardSwitch';
import {
  api,
  COUNT_PARAM,
  PARTIAL_DECK_PARAM,
  ResponseProps,
  CardResponseProps,
} from '../../lib/axios';

export function GameCards() {
  const [playerName, setPlayerName] = useState('');
  const [cards, setCards] = useState<CardProps[]>([]);
  const [deckId, setDeckId] = useState('');
  const [countCardsAdded, setCountCardsAdded] = useState(3);
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    const namePlayer = window.localStorage.getItem(inputNameKey);
    if (namePlayer) setPlayerName(namePlayer);
  }, []);

  useEffect(() => {
    fetchNewDeck();
  }, []);

  async function fetchNewDeck() {
    try {
      if (cards.length > 0) return;

      const { data } = await api.get<ResponseProps>('new/shuffle', {
        params: {
          cards: PARTIAL_DECK_PARAM,
        },
      });

      setDeckId(data.deck_id);

      const partialDeck = await api.get<ResponseProps>(`${data.deck_id}/draw`, {
        params: {
          count: COUNT_PARAM,
        },
      });

      const cardData = getFormatCardData(partialDeck.data.cards);

      setCards(cardData);
    } catch (error) {
      console.log(error);
    }
  }

  function getFormatCardData(cardsResponse: CardResponseProps[]) {
    return cardsResponse.map(card => {
      const nameCard = nameCardSwitch(card.code);

      return {
        code: card.code,
        name: nameCard,
        description: 'descrição da carta',
        image: card.image,
        value: card.value,
      };
    });
  }

  async function handleAddNewCard() {
    try {
      if (cards.length === 8) return;

      const buyCard = await api.get<ResponseProps>(`${deckId}/draw`, {
        params: {
          count: 1,
        },
      });

      const formattedCardData = getFormatCardData(buyCard.data.cards);

      setCards(prevState => [...prevState, ...formattedCardData]);
      setCountCardsAdded(prev => prev - 1);
    } catch (error) {
      console.log(error);
    }
  }

  function handleShuffleCards() {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);

    setIsShuffled(prev => !prev);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.player}>Nome do Jogador: {playerName}</h2>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.code}
            name={card.name}
            description={card.description}
            image={card.image}
            value={card.value}
          />
        ))}
      </div>

      <div className={styles.buttons}>
        <div className={styles.btnAdd}>
          <Button
            name="Puxar nova carta"
            onClick={handleAddNewCard}
            disabled={cards.length === 8}
          />

          <p>Compras restantes: {countCardsAdded}</p>
        </div>
        <Button name="Embaralhar" onClick={handleShuffleCards} />
      </div>
    </div>
  );
}
