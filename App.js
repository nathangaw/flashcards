import React from 'react'
import { StyleSheet, StatusBar, Text, View } from 'react-native'
import { Constants } from 'expo'


export default class App extends React.Component {

  state = {
    decks: {
      Deck1: {
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
      Deck2: {
        title: 'Deck 2',
        questions: [
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
    }
  }




  render() {
    return (        
          
          <View style={styles.container}>
            <Text style={styles.header}>Your Decks</Text>
            {this.state.decks.map( deck => (
              <View>
                <Text>I am a card</Text>
              </View>
            ))}
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30
  },
  card: {
    backgroundColor: '#4286f4'
  }
});
