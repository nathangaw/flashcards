import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck'
import {FontAwesome, Ionicons} from '@expo/vector-icons'


class DeckList extends React.Component {

  state = {
      decks: [
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
    }

    




  render() {
      return(

      <View style={styles.container}>
        <FlatList
          style={{width: '90%'}}
          data={this.state.decks}
          renderItem={({item}) => 
            <View style={styles.card}>
              <Text style={{fontSize: 25, textAlign: 'center', color: '#fff'}}>{item.title}</Text>
              <Text style={{fontSize: 15, textAlign: 'center', color: '#fff'}}>{item.questions.length} cards</Text>
            </View>}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 30,
    paddingBottom: 20
  },
  card: {
    backgroundColor: '#4286f4',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    padding: 40,
    borderRadius: 10
  }
});

const blue = '#4286f4'
const grey = '#808080'

const DeckStack = StackNavigator({
  Decks: { 
    screen: DeckList,
    navigationOptions: {
      title: 'Your decks'
    }
  }
})


export default TabNavigator(
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

