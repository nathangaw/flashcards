import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckSummary from './components/DeckSummary'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { Ionicons } from '@expo/vector-icons'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { blue, grey } from './utils/colors.js'


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


export default class App extends React.Component {
  
  render() {
    return(
      <Provider store={store}>
        <Tabs />
      </Provider>
    )
  }
}

const DeckStack = StackNavigator({
  Decks: { 
    screen: DeckList,
    navigationOptions: {
      title: 'Your decks'
    }
  },
  DeckSummary: {
    screen: DeckSummary,
    navigationOptions: {
      title: 'Deck detail'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add a card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

const addDeckStack = StackNavigator({
  AddDeck: { 
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck'
    }
  }
})


const Tabs = TabNavigator(
  {
    Decks: {
      screen: DeckStack,
      navigationOptions: {
        tabBarLabel: 'Your decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
      }
    },
    AddDeck: {
      screen: addDeckStack,
      navigationOptions: {
        tabBarLabel: 'Add decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: blue,
      inactiveTintColor: grey
    }
  }
)
