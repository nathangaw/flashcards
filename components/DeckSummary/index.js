import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue } from '../../utils/colors.js'




export class DeckSummary extends React.Component {

    state = {
        title: '',
        activeDeck: [{title: '', questions: []}]
    }

    /* need to filter decks from state to ensure view is updated when returning from AddCard */
    componentDidMount() {
        const title = this.props.navigation.getParam('title', '')
        setTimeout(function() {
            let activeDeck = this.props.decks.filter(deck => deck.title == title)
            this.setState({
                activeDeck,
                title
            })
        }.bind(this), 50)
    }

    render() {

        return(

        <View style={styles.card}>
          
            <Text>{this.state.title}</Text>
            <Text>{this.state.activeDeck[0].questions.length} cards</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddCard', {title: this.state.title})}}><Text>Add card</Text></TouchableOpacity>

            { (this.state.activeDeck[0].questions.length > 0)

            ? <TouchableOpacity onPress={() => {this.props.navigation.navigate('Quiz', {title: this.state.title})}}><Text>Start quiz</Text></TouchableOpacity>
            : <Text></Text>

            }

            

            
             
        </View>
        )
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default connect(mapStateToProps)(DeckSummary);