import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitleToStorage } from '../../actions'


class AddDeck extends React.Component {

    state = {
        input: ''
    }

    deckSubmit = () => {
        this.props.saveDeckTitleToStorage(this.props.decks, this.state.input)
        this.props.navigation.navigate('DeckSummary', {title: this.state.input})
    }
    

    render() {
        return(

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginBottom: 20}}>Type the name of your new deck.</Text>
            <TextInput 
                style={{width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
                onChangeText={(input) => this.setState({input: input})}
                value={this.state.input}
            />
            <Button
                onPress={() => {
                this.deckSubmit()
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
        saveDeckTitleToStorage: (decks, title) => dispatch(saveDeckTitleToStorage(decks, title))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);

