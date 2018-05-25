import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveCardToStorage } from '../../actions'
import FlipCard from 'react-native-flip-card'
import { setLocalNotification, clearNotifications } from '../../utils/notifications'




export class Quiz extends React.Component {

    state = {
        activeQuestions: [{question: '', answer: ''}],
        questionNumber: 0,
        numberOfQuestions: 0,
        isQuizFinished: false,
        flipped: false,
        numberOfCorrect: 0,
        numberOfIncorrect: 0,
        quizFinished: false,
        percentage: 0
    }
    
    componentDidMount() {
        const title = this.props.navigation.getParam('title', 'Dummy')
        let activeDeck = this.props.decks.filter(deck => deck.title == title)
        this.setState({
            activeQuestions: activeDeck[0].questions
        })
    }


    /* have to pass state direct to calculatePercentage, otherwise it doesn't update in time */
    incrementQuestion = (numberCorrect) => {
        if (this.state.questionNumber + 1 === this.state.activeQuestions.length) {
            this.setState({
                quizFinished: true
            })
            this.calculatePercentage(numberCorrect)
        } else {
            let newQuestion = this.state.questionNumber + 1
            this.setState({
                questionNumber: newQuestion,
                flipped: false
            })
        }
    }

    flipCard = () => {
        this.setState({
            flipped: true
        })
    }

    /* have to pass updated state to incrementQuestion so that it is available for calculatePercentage */
    incrementCorrect = () => {
        this.setState({
            numberOfCorrect: this.state.numberOfCorrect + 1
        })
        this.incrementQuestion(this.state.numberOfCorrect + 1)
        clearNotifications().then(setLocalNotification)
    }

     /* have to pass state to incrementQuestion so that it is available for calculatePercentage */
    incrementIncorrect = () => {
        this.setState({
            numberOfIncorrect: this.state.numberOfIncorrect + 1
        })
        this.incrementQuestion(this.state.numberOfCorrect)
        clearNotifications().then(setLocalNotification)
    }

    calculatePercentage = (numberCorrect) => {
        let totalAnswers = this.state.activeQuestions.length
        let percentage = Math.round((numberCorrect/totalAnswers) * 100)
        this.setState({
            percentage
        })
    }

    resetQuiz = () => {
        this.setState({
            questionNumber: 0,
            isQuizFinished: false,
            flipped: false,
            numberOfCorrect: 0,
            numberOfIncorrect: 0,
            quizFinished: false,
            percentage: 0
        })
    }

    render() {

        

        return(

        <FlipCard flip={this.state.flipped} clickable={false} flipHorizontal={true} flipVertical={false} friction={10} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                
                <Text>Question {this.state.questionNumber + 1} of {this.state.activeQuestions.length}</Text>
                <Text>{this.state.activeQuestions[this.state.questionNumber].question}</Text>
                <Text>So far {this.state.numberOfCorrect} correct and {this.state.numberOfIncorrect} incorrect</Text>
                
                <Button
                    onPress={() => {
                    this.flipCard()
                    }}
                    title='See answer'
                />

                
                
            </View>
            <View>

                { (this.state.quizFinished === false)

                    ?

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>And the answer is...</Text>
                        <Text>{this.state.activeQuestions[this.state.questionNumber].answer}</Text>
                        <Button
                            onPress={() => {
                            this.incrementCorrect()
                            }}
                            title='I was correct'
                        />
                        <Button
                            onPress={() => {
                            this.incrementIncorrect()
                            }}
                            title='I was incorrect'
                        />
                    </View>

                    : 
                    
                    <View>
                        <Text>You have finished</Text>
                        <Text>You got {this.state.numberOfCorrect} correct and {this.state.numberOfIncorrect} incorrect.</Text>
                        <Text>You scored {this.state.percentage}%</Text>
                        <Button
                            onPress={() => {
                            this.props.navigation.goBack()
                            }}
                            title='Go back to deck detail'
                        />
                        <Button
                            onPress={() => {
                            this.resetQuiz()
                            }}
                            title='Restart quiz'
                        />
                    </View>

                }
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