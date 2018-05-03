import { AsyncStorage } from 'react-native'

export function getDecks () {
    return AsyncStorage.getItem()

}

export function saveDeckTitle () {
    return AsyncStorage.setItem( {key, value} )
}