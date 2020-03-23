import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckFeedScreen from '../screens/DeckFeedScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import DeckSingleScreen from '../screens/DeckSingleScreen';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Decks';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Decks"
        component={DeckFeedScreen}
        options={
          {
          title: 'Decks',
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="cards" focused={focused} />
        }
      }
      />
      <BottomTab.Screen
        name="AddDeck"
        component={AddDeckScreen}
        options={
          {
          title: 'Add Deck',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box" color={color} />
        }
      }
      />

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
