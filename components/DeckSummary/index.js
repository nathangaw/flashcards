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
          
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.cardNumber}>Number of cards: {this.state.activeDeck[0].questions.length}</Text>

            <View style={styles.buttonWrapper}>

                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('AddCard', {title: this.state.title})}}><Text style={{color: '#fff'}}>Add card</Text></TouchableOpacity>

                { (this.state.activeDeck[0].questions.length > 0)

                ? <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Quiz', {title: this.state.title})}}><Text style={{color: '#fff'}}>Start quiz</Text></TouchableOpacity>
                : <Text></Text>

                }

            </View>
             
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
        width: '100%'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 10
    },
    cardNumber: {
        fontSize: 15,
        textAlign: 'center',
        color: '#fff'
    },
    buttonWrapper: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#696969',
        padding: 10,
        margin: 15
    }
  });

const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

export default connect(mapStateToProps)(DeckSummary);