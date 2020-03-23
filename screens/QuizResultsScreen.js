import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Button from '../components/Button';

export const QuizResultsScreen = (props) => (
  <View style={styles.resultContainer}>
  <View>
    <Text style={styles.resultsText}>Score: {Math.round((props.correct / props.totalAnswered) * 100) }%</Text>
    <Text style={styles.resultsText}>Correct answers: {props.correct}</Text>
    <Text style={styles.resultsText}>Questions answered: {props.totalAnswered}</Text>
  </View>    
    <Button text='Restart' press={props.restart} />
    <Button text='Go Back' press={props.goBack} />
  </View>
);

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  }
});