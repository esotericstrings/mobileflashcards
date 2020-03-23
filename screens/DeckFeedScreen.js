import React, { Component } from 'react';
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllDecks } from '../actions';

class DeckFeedScreen extends Component {
  componentDidMount() {
    this.props.getAllDecks();
  }

  navigateToDeck = deck => {
    this.props.navigation.navigate('DeckSingle', { deck });
  };

  render() {
    return (
      <FlatList
        style={styles.deckFeed}
        data={Object.values(this.props.decks)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ ({ item }) => (
          <TouchableOpacity onPress={() => this.navigateToDeck(item.title)}>
            <View style={styles.deckItem}>
              <Text style={styles.deckTitle}>{item.title}</Text>
              <Text style={styles.cardNumber}>{item.questions.length} cards</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  deckFeed: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 5,
    padding: 10,
  },
  deckItem: {
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3
  },
  deckTitle: {
    marginBottom: 5,
    fontSize: 25,
  },
  cardNumber: {
    fontSize: 15
  }
});

function mapStateToProps(state) {
  return { decks: state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllDecks }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )(DeckFeedScreen);