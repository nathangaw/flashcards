import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity } from 'react-native'


export default class DeckSummary extends React.Component {

    

    render() {

        const title = this.props.navigation.getParam('title', 'Dummy')
        const questions = this.props.navigation.getParam('questions', 'dummy question')
        const numberOfQuestions = questions.length


        return(

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
            <Text style={{color: 'black'}}>{title}</Text>
            <Text>{numberOfQuestions} cards</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddCard', {title: title})}}><Text>Add card</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Quiz', {title: title})}}><Text>Start quiz</Text></TouchableOpacity>
             
            
        </View>
        )
    }

}