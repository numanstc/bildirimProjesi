import React, {useEffect, useState} from 'react';
import {FlatList, Alert, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import Header from '../componenets/Header';

function Recently() {
  return (
    <React.Fragment>
      <Header title="Son Eklenen İlanlar" />
      {recentlyPosts.length ? (
        <FlatList
          data={recentlyPosts}
          renderItem={(item) => <PostPreview data={item.item} />}
          keyExtractor={(item) => item.slug}
          refreshing={refreshStatus}
          onRefresh={() => refresh()}
        />
      ) : (
        // <PostsLoading />
        <Text>Post Loading</Text>
      )}
    </React.Fragment>
  );
}

export default Recently;
