import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function LoadApp() {
  return (
    <View style={styles.icon}>
      <Icon name="loader" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
