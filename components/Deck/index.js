import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecksFromStorage } from '../../actions'
import { blue } from '../../utils/colors.js'


class Deck extends React.Component {

    render() {
        return(
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('DeckSummary', {title: this.props.title})}}>
                <View style={styles.card}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.cardNumber}>{this.props.questions.length} cards</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
  
const styles = StyleSheet.create({
  card: {
    backgroundColor: blue,
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    padding: 40,
    borderRadius: 10
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  cardNumber: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff'
  }
});
  
const mapStateToProps = (state) => {
  return {
      decks: state.decks  
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDecksFromStorage: () => dispatch(getDecksFromStorage())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Deck);
  
  
  
  