import { CardProps } from "../components/Card"

export function shuffleCards(cards: CardProps[]) {
  let shuffledCards = cards.sort(function () {
    return Math.random() - 0.5;
  });

  return shuffledCards;
}
