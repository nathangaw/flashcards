import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getDecksFromStorage, deleteAllDecksFromStorage } from '../../actions'


class Deck extends React.Component {

    render() {
        return(
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('DeckSummary', {title: this.props.title, questions: this.props.questions})}}>
                <View style={styles.card}>
                <Text style={{fontSize: 25, textAlign: 'center', color: '#fff'}}>{this.props.title}</Text>
                <Text style={{fontSize: 15, textAlign: 'center', color: '#fff'}}>{this.props.questions.length} cards</Text>
                </View>
            </TouchableOpacity>
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
  
  const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      getDecksFromStorage: () => dispatch(getDecksFromStorage()),
      deleteAllDecksFromStorage: () => dispatch(deleteAllDecksFromStorage())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Deck);
  
  
  
  