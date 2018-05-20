import { combineReducers } from 'redux'


export function decks (state = [], action) {
    switch (action.type) {
        case 'GET_DECKS':
            return action.decks
        case 'DELETE_DECKS':
            return action.decks
        default:
            return state;
    }
}



export default combineReducers({
    decks
  });



