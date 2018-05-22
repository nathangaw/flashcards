import React from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'



export class DeckSummary extends React.Component {

    state = {
        title: '',
        activeDeck: [{title: '', questions: []}]
    }

    /* need to filter decks from state to ensure view is updated when returning from AddCard */
    componentDidMount() {
        const title = this.props.navigation.getParam('title', 'Dummy')
        setTimeout(function() {
            let activeDeck = this.props.decks.filter(deck => deck.title == title)
            this.setState({
                activeDeck,
                title
            })
        }.bind(this), 10)
        
        


        /* issue: decks is available but the new deck has not yet been added to redux state  */
        console.log(this.props.decks)
    }

    render() {

        return(

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
            <Text style={{color: 'black'}}>{this.state.title}</Text>
            <Text>{this.state.activeDeck[0].questions.length} cards</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddCard', {title: this.state.title})}}><Text>Add card</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Quiz', {title: this.state.title})}}><Text>Start quiz</Text></TouchableOpacity>

            <TouchableOpacity onPress={() => {console.log(this.props.decks)}}><Text>Log decks</Text></TouchableOpacity>
             
            
        </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

  


export default connect(mapStateToProps)(DeckSummary);