import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Header({title}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d69bf',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
  },
});

export default Header;
