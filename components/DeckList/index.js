import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { connect } from 'react-redux'
import { getDecksFromStorage } from '../../actions'
import Deck from '../Deck'


class DeckList extends React.Component {

  componentDidMount() {
    this.props.getDecksFromStorage()
  }
  
  _renderItem=({item}) => (
    <Deck
      key={item.title}
      title={item.title}
      questions={item.questions}
      navigation={this.props.navigation}
    />
  )
    
  render() {
      
    if(this.props.decks.length === 0)
    
      return(
        <View style={styles.noCardsContainer}>
        <Text style={{textAlign: 'center', padding: 20}}>You haven't added any decks yet. Hit the button below to get started.</Text>
        <Button
                onPress={() => {
                this.props.navigation.navigate('AddDeck')
                }}
                title='Add your first deck'
            />

        </View>
      )
      
      return(

      <View style={styles.container}>
        <FlatList
          style={{width: '90%'}}
          data={this.props.decks}
          renderItem={this._renderItem}
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
  noCardsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
  
  
  
  