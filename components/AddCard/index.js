import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveCardToStorage } from '../../actions'


export class AddCard extends React.Component {

    state = {
        newQuestion: '',
        newAnswer: '',
        title: ''
    }
    
    componentDidMount() {
        const title = this.props.navigation.getParam('title', 'Dummy')
        this.setState({
            title
        })
    }

    submitCard = () => {
        this.props.saveCardToStorage(this.state.title, this.state.newQuestion, this.state.newAnswer, this.props.decks)
        this.props.navigation.goBack()
    }

    render() {

        return(

        <View style={styles.container}>
            <Text style={styles.intro}>Add a new card to the {this.state.title} deck.</Text>
            <Text>Your question</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(input) => this.setState({newQuestion: input})}
                value={this.state.newQuestion}
            />
            <Text>Your answer</Text>
            <TextInput 
                style={styles.input}
                onChangeText={(input) => this.setState({newAnswer: input})}
                value={this.state.newAnswer}
            />
            <Button
                onPress={() => {
                this.submitCard()
                }}
                title='Submit'
            />
             
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    intro: {
        marginBottom: 20
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 20
    }
  });

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