import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import create from './sqlite/create';
import backgroundJobs from './methods/backgroundJobs';
import Recently from './pages/Recently';
import LoadApp from './components/LoadApp';

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
    backgroundJobs();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  });
  if (isLoading) return <LoadApp />;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2E4E8C" barStyle="light-content" />

      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Tabs" component={Recently} />
        {/* <Stack.Screen name="Post" component={Post} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
