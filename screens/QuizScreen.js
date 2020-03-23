import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NavigationActions, CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Notifications } from 'expo';
import { setLocalNotification, clearLocalNotification, NOTIFICATION_KEY } from '../utils/helpers';
import { getAllDecks } from '../actions';
import Button from '../components/Button';
import { QuizEmptyScreen } from './QuizEmptyScreen';
import { QuizResultsScreen } from './QuizResultsScreen';

class QuizScreen extends PureComponent {
  state = { 
    currentQuestion: 0,
    correctAnswers: 0,
    show: 'question',
    showResults: false
  };

  toggleAnswer = () => {
    const show = (this.state.show) === 'question' ? 'answer' : 'question'
    this.setState({ show });
  }

  answerQuestion(answer) {
    if(answer === 'correct') {
      this.setState({ correctAnswers: this.state.correctAnswers + 1 });
    }
    if(this.state.currentQuestion === (this.props.deck.questions.length - 1) ) {
      this.setState({ showResults: true });
    } else {
      this.setState({ currentQuestion: this.state.currentQuestion + 1, show: 'question' });
    }
  }

  restart = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      show: 'question',
      showResults: false
    });
    clearLocalNotification().then(setLocalNotification)   
  }

  goBack = () => {
    this.props.navigation.dispatch(CommonActions.goBack());
  }

  render() { 
    if(this.props.deck.questions.length === 0) {
      return <QuizEmptyScreen/>
    }

    if(this.state.showResults) {
      return (
        <QuizResultsScreen
          totalAnswered={this.props.deck.questions.length}
          correct={this.state.correctAnswers}
          restart={this.restart}
          goBack={this.goBack}
        />
      );
    }
    
    const currentCard =  this.props.deck ? this.props.deck.questions[this.state.currentQuestion] : {};

    return (
      <View style={{ flex: 1 }}>

        <View style={styles.quizCard}>
          <View>
            <Text>Card {this.state.currentQuestion + 1}/{this.props.deck.questions.length}</Text>
          </View>

          { 
            this.state.show == 'question' 
            ? <Text style={styles.questionText}>{currentCard.question}</Text>
            : <Text style={styles.answerText}>{currentCard.answer}</Text>
          }

        <TouchableWithoutFeedback onPress={this.toggleAnswer} current={this.state.show}>
          <View>
            { this.state.show == 'question' ? <Text style={styles.toggle}>Show Answer</Text>
              : 
                  <View>
                    <Button text='Correct' press={() => this.answerQuestion('correct')}/>
                    <Button text='Incorrect' press={() => this.answerQuestion('incorrect')}/>
                  </View>
            }
          </View>
        </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 30
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  toggle: {
    borderRadius: 5,
    padding: 20,
    minWidth: 200,
    margin: 5,
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center'
  },
  quizCard: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 25,
    padding: 25,
    backgroundColor: 'white',
    elevation: 3
  },
  questionText: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  answerText: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllDecks }, dispatch);
}

function mapStateToProps(state, ownProps) {
  return { deck: ownProps.route.params ? state[ownProps.route.params.deck] : 'Title' };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);