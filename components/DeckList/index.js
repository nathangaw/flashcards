import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator } from 'react-navigation'

export default class DeckList extends React.Component {

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
          
            <Text style={styles.header}>Your Decks</Text>
            
              
                {this.state.decks.map( deck => (
                  <View key={deck.title} style={styles.card}>
                    <Text style={{fontSize: 25, textAlign: 'center', color: '#fff'}}>{deck.title}</Text>
                    <Text style={{fontSize: 15, textAlign: 'center', color: '#fff'}}>{deck.questions.length} cards</Text>
                  </View>
                ))}
             
            
        </View>
        )
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
      fontSize: 30,
      paddingBottom: 20
    },
    card: {
      backgroundColor: '#4286f4',
      width: '90%',
      marginBottom: 10,
      marginTop: 10,
      padding: 40,
      borderRadius: 10
    }
  });
