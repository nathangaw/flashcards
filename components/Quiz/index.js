import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveCardToStorage } from '../../actions'
import FlipCard from 'react-native-flip-card'




export class Quiz extends React.Component {

    state = {
        activeQuestions: [{question: '', answer: ''}],
        questionNumber: 0,
        numberOfQuestions: 0,
        isQuizFinished: false,
        flipped: false
    }
    
    componentDidMount() {
        const title = this.props.navigation.getParam('title', 'Dummy')
        let activeDeck = this.props.decks.filter(deck => deck.title == title)
        this.setState({
            activeQuestions: activeDeck[0].questions
        })
    }

    incrementQuestion = () => {
        newQuestion = this.state.questionNumber + 1
        this.setState({
            questionNumber: newQuestion
        })
    }

    flipCard = () => {
        this.setState({
            flipped: true
        })
    }

    render() {

        

        return(

        <FlipCard flip={this.state.flipped} clickable={false} flipHorizontal={true} flipVertical={false} friction={10} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                
                <Text>Question {this.state.questionNumber + 1} of {this.state.activeQuestions.length}</Text>
                <Text>{this.state.activeQuestions[this.state.questionNumber].question}</Text>
                <Button
                    onPress={() => {
                    this.incrementQuestion()
                    }}
                    title='Next question'
                />
                <Button
                    onPress={() => {
                    this.flipCard()
                    }}
                    title='See reverse'
                />

                
                
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>I'm the back</Text>
            </View>
        </FlipCard>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

  


export default connect(mapStateToProps)(Quiz);