import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../../actions'


class AddDeck extends React.Component {

    state = {
        input: ''
    }

    render() {
        return(

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
            <TextInput 
                style={{width: '90%', height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
                onChangeText={(input) => this.setState({input})}
                value={this.state.input}
            />
            <Button
                onPress={() => {
                this.props.saveDeckTitle(this.state.input)
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
        saveDeckTitle: (title) => dispatch(saveDeckTitle(title))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
