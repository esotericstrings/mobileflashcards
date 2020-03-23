import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = (props) => (
  <TouchableOpacity 
    style={styles.button}
    onPress={props.press}>
    <Text style={styles.buttonText}>{props.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 20,
    minWidth: 200,
    margin: 5,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default Button;