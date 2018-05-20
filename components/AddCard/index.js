import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveCardToStorage } from '../../actions'


export class AddCard extends React.Component {

    state = {
        newQuestion: '',
        newAnswer: ''
    }
    

    render() {

        const title = this.props.navigation.getParam('title', 'Dummy')
        


        return(

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Saving new card to {title} deck</Text>
            <TextInput 
                style={{width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
                onChangeText={(input) => this.setState({newQuestion: input})}
                value={this.state.newQuestion}
            />
            <TextInput 
                style={{width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
                onChangeText={(input) => this.setState({newAnswer: input})}
                value={this.state.newAnswer}
            />
            <Button
                onPress={() => {
                this.props.saveCardToStorage(title, this.state.newQuestion, this.state.newAnswer, this.props.decks)
                }}
                title='Submit'
            />
             
            
        </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      saveCardToStorage: (deckTitle, newQuestion, newAnswer, currentDecks) => dispatch(saveCardToStorage(deckTitle, newQuestion, newAnswer, currentDecks)),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(AddCard);