import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import useLinking from './navigation/useLinking';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import DeckSingleScreen from './screens/DeckSingleScreen';
import DeckFeedScreen from './screens/DeckFeedScreen';
import AddDeckScreen from './screens/AddDeckScreen';
import AddCardScreen from './screens/AddCardScreen';
import QuizScreen from './screens/QuizScreen';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import middleware from './middleware';
import reducer from './reducers';

const Stack = createStackNavigator();
const store = createStore(reducer, {}, middleware);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Flashcards" component={BottomTabNavigator} />
            <Stack.Screen name="DeckFeedScreen" component={DeckFeedScreen} options={{ title: 'Decks'}}/>
            <Stack.Screen name="AddDeckScreen" component={AddDeckScreen} options={{ title: 'Add Deck'}} />
            <Stack.Screen name="DeckSingle" component={DeckSingleScreen} options={{ title: 'Deck'}}/>
            <Stack.Screen name="AddCard" component={AddCardScreen} options={{ title: 'Add Card'}}/>
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
