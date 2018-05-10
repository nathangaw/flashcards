import { AsyncStorage } from 'react-native'

export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'


export function saveDeckTitle(title) {
	return {
		type: 'SAVE_DECK_TITLE',
		title: title
	}
}





 