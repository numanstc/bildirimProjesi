import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import Tabs from './componenets/Tabs';
import create from './sqlite/create';

const Stack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    await create();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  });
  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2E4E8C" barStyle="light-content" />

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Tabs" component={Tabs} />
        {/* <Stack.Screen name="SearchResults" component={SearchResults} /> */}
        {/* <Stack.Screen name="Post" component={Post} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({});

export default App;
