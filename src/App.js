import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import Tabs from './componenets/Tabs';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2E4E8C" barStyle="light-content" />

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Tabs" component={Tabs} />
        {/* <Stack.Screen name="Post" component={Post} /> */}
        {/* <Stack.Screen name="SearchResults" component={SearchResults} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

export default App;
