import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationActions } from '@react-navigation/native';

import { addCardToDeck } from '../utils/api';
import { addNewCard } from '../actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Colors from '../constants/Colors';

class AddCardScreen extends PureComponent {
  state = { 
    question: '',
    answer: '',
    emptyQuestion: false,
    emptyAnswer: false
  };

  createCard = () => {
    if(this.state.question.length > 0 && this.state.answer.length > 0) {
      const card = {
        question: this.state.question,
        answer: this.state.answer
      }
      const title =  this.props.route.params.deck ? this.props.route.params.deck : '';
      addCardToDeck(title, card);
      this.props.addNewCard(title, card);
      this.setState({ 
        question: '',
        answer: ''
      });
      this.props.navigation.navigate('DeckSingle', { deck: title });
    } else {
      if(this.state.question.length <= 0) {
        this.setState({ emptyQuestion: true })
      }
      if(this.state.answer.length <= 0) {
        this.setState({ emptyAnswer: true })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Question'
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        {this.state.emptyQuestion && <Text style={styles.error}>Question cannot be empty.</Text>}

        <TextInput
          style={styles.input}
          placeholder='Answer'
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        {this.state.emptyAnswer && <Text style={styles.error}>Answer cannot be empty.</Text>}

        <View style={styles.buttonContainer}>
          <Button text='Add Card' press={this.createCard}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: Colors.screenBackground,
  },
  error: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.errorText,
    backgroundColor: Colors.errorBackground,
  },
  input: {
    padding: 10,
    marginTop: 15,    
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 15
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewCard }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddCardScreen);