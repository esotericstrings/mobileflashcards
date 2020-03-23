import { getDecks, getDeck } from '../utils/api';
export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const GET_SINGLE_DECK = 'GET_SINGLE_DECK';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

export function getAllDecks() {
  return (dispatch) => {
    getDecks()
      .then((decks) => {
        dispatch({
          type: GET_ALL_DECKS, 
          payload: decks
        })
      })
  }
}

export function getSingleDeck(title) {
  return (dispatch) => {
    getDeck(title)
      .then((deck) => {
        dispatch({
          type: GET_SINGLE_DECK, 
          payload: deck
        })
      })
  }
}

export function addNewDeck(deck) {
  return {
    type: ADD_NEW_DECK,
    payload: deck
  }
}

export function addNewCard(deck, card) {
  return {
    type: ADD_NEW_CARD,
    deck,
    card
  }
}