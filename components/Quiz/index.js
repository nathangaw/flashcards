import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
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

        <FlipCard flip={this.state.flipped} clickable={false} flipHorizontal={true} flipVertical={false} friction={10} style={styles.flipCard}>
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <Text>Question {this.state.questionNumber + 1} of {this.state.activeQuestions.length}</Text>
                    <Text>So far {this.state.numberOfCorrect} correct and {this.state.numberOfIncorrect} incorrect</Text>
                </View>

                <Text style={styles.question}>{this.state.activeQuestions[this.state.questionNumber].question}</Text>
                
                
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

                    <View style={styles.centredContainer}>
                        <Text>And the answer is...</Text>
                        <Text style={styles.answer}>{this.state.activeQuestions[this.state.questionNumber].answer}</Text>
                        <View style={styles.buttonWrapper}>
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
                    </View>

                    : 
                    
                    <View style={styles.centredContainer}>
                        <Text>You have finished!</Text>
                        <Text>You got {this.state.numberOfCorrect} correct and {this.state.numberOfIncorrect} incorrect.</Text>
                        <Text>You scored {this.state.percentage}%</Text>
                        
                        <View style={styles.completeButtons}>
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
                    </View>

                }
            </View>
        </FlipCard>
        )
    }

}

const styles = StyleSheet.create({
    flipCard: {
        flex: 1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        marginTop: 20
    },
    question: {
        fontSize: 20,
        marginTop: 220
    },
    centredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    answer: {
        fontSize: 20,
        marginTop: 20
    },
    buttonWrapper: {
        flexDirection: 'row',
        marginTop: 20
    },
    completeButtons: {
        marginTop: 20
    }
  });


const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

export default connect(mapStateToProps)(Quiz);