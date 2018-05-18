import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckSummary from './components/DeckSummary'
import DeckList from './components/DeckList'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


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
      screen: AddDeck,
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
);

const blue = '#4286f4'
const grey = '#808080'
