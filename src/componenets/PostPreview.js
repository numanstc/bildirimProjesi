import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import Tags from 'kodilan../sqlIte2/createTables/Tags';
// import timeSince from 'k../sqlIte2/insertPagespers/timeSince';
// import PostType fro../sqlIte2/selecte/src/components/PostType';
// import {pageLinks} from '../webScraping/pageLinks';

function PostPreview() {
  const navigation = useNavigation();
  function onPressPost() {
    navigation.push('Post', {data});
  }

  const data = {
    type: 'Type Deneme',
    position: 'Pozisyon',
    company: {
      name: 'Company Name',
    },
    location: 'Location',
  };
  return (
    <TouchableOpacity
      style={styles.post}
      activeOpacity={0.75}
      onPress={() => onPressPost()}>
      {/* // import timeSince from 'kodilan-mobile/src/helpers/timeSince'; // import */}
      {/* PostType from 'kodilan-mobile/src/components/PostType'; */}
      <View style={styles.top}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{data.position}</Text>
          {/* <PostType type={data.type} /> */}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Icon name="briefcase" color="#333" size={14} />
          <Text style={styles.infoText} numberOfLines={1}>
            {data.company.name}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="map-pin" color="#333" size={14} />
          <Text style={styles.infoText} numberOfLines={1}>
            {data.location}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="clock" color="#333" size={14} />
          <Text style={styles.infoText} numberOfLines={1}>
            time since
            {/* {timeSince(data.updated_at)} */}
          </Text>
        </View>
        <View>{/* <Text>{sonuc.Text}</Text> */}</View>
      </View>

      {/* {data.tags.length ? (
        <Tags
          tags={data.tags}
          slug={data.slug}
          style={styles.tags}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
        />
      ) : null} */}
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
  image: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
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
  tags: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 14,
  },
  tag: {
    backgroundColor: '#f1f1f1',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  tagText: {
    color: '#666',
    fontSize: 13,
  },
});

export default PostPreview;
