import { combineReducers } from 'redux'


const initialState = [
    {
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
        },
        {
        title: 'Deck 2',
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
        },
        {
        title: 'Deck 3',
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
        },
        {
        title: 'Deck 4',
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
        },
        {
        title: 'Deck 5',
        questions: [
            {
            question: 'What is Angular?',
            answer: 'Something other than React'
            },
            {
            question: 'What is Angular?',
            answer: 'Something other than React'
            },
            {
            question: 'Where do you get the best coffee?',
            answer: 'At home'
            }
        ]
    }
]



export function decks (state = [], action) {
    switch (action.type) {
        case 'GET_DECKS':
            return action.decks
        case 'DELETE_DECKS':
            return action.decks
        case 'SAVE_DECK_TITLE':
            return [...state, {
                title: action.title,
                questions: []
            }]
        default:
            return state;
    }
}










export default combineReducers({
    decks
  });



