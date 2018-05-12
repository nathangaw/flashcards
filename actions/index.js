import { AsyncStorage } from 'react-native'

export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const GET_DECKS = 'GET_DECKS'
export const DELETE_DECKS = 'DELETE_DECKS'


export function saveDeckTitle(title) {
	return {
		type: 'SAVE_DECK_TITLE',
		title: title
	}
}

export function getDecks(decks) {
	return {
		type: 'GET_DECKS',
		decks: decks
	}
}

export function deleteDecks() {
	return {
		type: 'DELETE_DECKS',
		decks: []
	}
}




/* updating async storage */

export const FLASHCARDS_STORAGE_KEY = 'FLASHCARDS_STORAGE_KEY'

let initialData = {
	title: 'Deck 1',
	questions: [
		{
		question: 'What is React?',
		answer: 'A library for managing user interfaces'
		},
		{
		question: 'Where do you make Ajax requests in React?',
		answer: 'The componentDidMount lifecycle event'
		}
	]
	}
	



function initialiseStorage() {
		AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
		return initialData
	}


export function getDecksFromStorage() {
	return (dispatch) => {
		return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(data => {
			return data === null ? initialiseStorage() : JSON.parse(data)
		})
		.then((data) => dispatch(getDecks(data)))
	}
}

export function deleteAllDecksFromStorage() {
	return(dispatch) => {
		return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
		.then(() => dispatch(deleteDecks()))
	}
}


export function saveDeckTitleToStorage(title) {
	return(dispatch) => {
		const newDeck = {
			title: title,
			questions: []
		}

		return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
			[title]: newDeck
		}))
	}
}