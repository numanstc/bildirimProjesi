/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

const App: () => React$Node = () => {
  return (
    <View>
      <Text>Deneme</Text>
      <Text>Deneme1</Text>
      <Text>
        <Icon name="rocket" size={30} color="#900" />;
        <FIcon name="home" size={30} />
      </Text>
    </View>
  );
};

export default App;
