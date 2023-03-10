import axios from 'axios'

export interface ResponseProps {
  cards: CardResponseProps[];
  deck_id: string;
}

export interface CardResponseProps {
  code: string;
  image: string;
  suit: 'DIAMONDS' | 'CLUBS' | 'HEARTS' | 'SPADES';
  value: number;
}

const spadesCards = "AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS";
const diamondsCards = "AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD";
const clubsCards = "AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC";
const heartsCards = "AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH";

export const PARTIAL_DECK_PARAM = `${spadesCards},${diamondsCards},${clubsCards},${heartsCards}`;
export const COUNT_PARAM = 5;

export const api = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck/',
})
