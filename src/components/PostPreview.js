import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function PostPreview({data}) {
  const navigation = useNavigation();
  function onPressPost() {
    navigation.push('Post', {data});
  }

  return (
    <TouchableOpacity
      style={styles.post}
      activeOpacity={0.75}
      onPress={() => onPressPost()}>
      <View style={styles.top}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{data.mesaj}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Icon name="clock" color="#333" size={14} />
          <Text style={styles.infoText} numberOfLines={1}>
            {data.yayinTarihi}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Icon name="clock" color="#333" size={14} />
          <Text style={styles.infoText} numberOfLines={1}>
            {data.sonYayinTarihi}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    width: '100%',
    borderLeftWidth: 0,
    borderLeftColor: '#186fc9',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 14,
    backgroundColor: '#FFF',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  top: {
    flexDirection: 'row',
  },
  title: {
    letterSpacing: 0,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 12,
    color: '#333',
  },
  info: {
    flexDirection: 'row',
    marginTop: 14,
    flexWrap: 'wrap',
  },
  infoItem: {
    marginRight: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
});

export default PostPreview;
