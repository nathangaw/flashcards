import React from 'react'
import { StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getDecksFromStorage, deleteAllDecksFromStorage } from '../../actions'




class DeckList extends React.Component {

    componentDidMount() {
      this.props.getDecksFromStorage()
    }
    
    render() {
        return(
    
        <View style={styles.container}>
          <FlatList
            style={{width: '90%'}}
            data={this.props.decks}
            renderItem={({item}) => 
              
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckSummary')}>
              <View style={styles.card}>
                  <Text style={{fontSize: 25, textAlign: 'center', color: '#fff'}}>{item.title}</Text>
                  <Text style={{fontSize: 15, textAlign: 'center', color: '#fff'}}>{item.questions.length} cards</Text>
              </View>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity onPress={() => this.props.deleteAllDecksFromStorage()}>
            <Text>DELETE ALL</Text>
          </TouchableOpacity>
        </View>
        )
    }
  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    header: {
      fontSize: 30,
      paddingBottom: 20
    },
    card: {
      backgroundColor: '#4286f4',
      width: '100%',
      marginBottom: 10,
      marginTop: 10,
      padding: 40,
      borderRadius: 10
    }
  });
  
  const blue = '#4286f4'
  const grey = '#808080'
  
  const mapStateToProps = (state) => {
    return {
        decks: state.decks  
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      getDecksFromStorage: () => dispatch(getDecksFromStorage()),
      deleteAllDecksFromStorage: () => dispatch(deleteAllDecksFromStorage())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
  
  
  
  