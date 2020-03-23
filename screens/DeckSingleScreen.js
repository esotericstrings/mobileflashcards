import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAllDecks, getSingleDeck } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../components/Button';

class DeckSingleScreen extends Component {
  componentDidMount() {
    this.props.getAllDecks();
  }
  
  render() {
    const deck = this.props.decks[this.props.deck] ? this.props.decks[this.props.deck] : {};
    return (
      <View style={styles.deckCard}>
        <View>
          <Text style={styles.deckTitle}>{ this.props.deck ? this.props.deck : ''}</Text>
          <Text style={styles.deckCount}> { Object.keys(deck).length ? Object.keys(deck.questions).length : '0' } cards</Text>
        </View>

        <View>
          <Button text='Add Card' press={() =>  this.props.navigation.navigate('AddCard', { deck: this.props.deck ? this.props.deck : ''})}/>
          <Button text='Start Quiz' press={() => this.props.navigation.navigate('Quiz', { deck: this.props.deck ? this.props.deck : ''})}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckCard: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 25,
    padding: 25,
    elevation: 3
  },
  deckTitle: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deckCount: {
    fontSize: 20,
    textAlign: 'center'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllDecks, getSingleDeck }, dispatch);
}

function mapStateToProps(state, ownProps) {
  return { decks: state, deck: ownProps.route.params ? ownProps.route.params.deck : 'Title' };
}

export default connect( mapStateToProps, mapDispatchToProps)(DeckSingleScreen);