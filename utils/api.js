import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'Mobile_Flashcards:decks';

const decks = {
  Deck1: {
    title: 'Deck1',
    questions: [
      {
        question: 'Deck1: Question 1',
        answer: 'False'
      },
      {
        question: 'Deck1: Question 2',
        answer: 'True'
      }
    ]
  },
  Deck2: {
    title: 'Deck2',
    questions: [
      {
        question: 'Deck2: Question 1',
        answer: 'Yes'
      }, 
      { 
        question: 'Deck2: Question 2',
        answer: 'No'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(result => {
    if(result !== null) {
      return JSON.parse(result) 
    } else {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
      return decks;
    }
  });
}

export function getDeck(title) {
  return getDecks()
    .then((decks) => decks[title]);
}

export function saveDeck(title) {
  const deckObj = { title, questions: [] };
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: deckObj
  }));
}

export function addCardToDeck(title, card) {
  return getDecks()
    .then((decks) => {
      decks[title].questions.push(card);
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
    });
}