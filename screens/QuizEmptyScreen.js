import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export const QuizEmptyScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
  </View>
);

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
});