import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitleToStorage } from '../../actions'


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
                this.props.saveDeckTitleToStorage(this.state.input)
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
        saveDeckTitleToStorage: (title) => dispatch(saveDeckTitleToStorage(title))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);

