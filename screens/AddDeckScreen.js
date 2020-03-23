import React, { Component, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import Colors from '../constants/Colors';
import { addNewDeck } from '../actions';
import { saveDeck } from '../utils/api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../components/Button';

class AddDeckScreen extends Component {
  state = { 
    title: '',
    emptyTitle: false
  };

  createDeck = () => {
    if(this.state.title.length > 0) {
      saveDeck(this.state.title);
      const deckObj = {
        [this.state.title]: {
          title: this.state.title,
          questions: []
        }
      };
      this.props.addNewDeck(deckObj);
      this.props.navigation.navigate('DeckSingle', { deck: this.state.title });
      this.setState({ title: '' });
    } else {
      this.setState({ emptyTitle: true })
    }
  }

  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            placeholder={"Deck Title"}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            onFocus={() => this.setState({ title: '', emptyTitle: false })}
          />
          {this.state.emptyTitle && <Text style={styles.error}>Deck title cannot be empty.</Text>}

          <View style={styles.buttonContainer}>
            <Button text='Create Deck' press={this.createDeck}/>
          </View>

        </View>
    );
  }
}

AddDeckScreen.navigationOptions = {
  header: null,
};

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
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    marginTop: 35,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 17
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeckScreen);