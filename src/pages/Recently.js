import React, {useEffect, useState} from 'react';
import {FlatList, Text, ActivityIndicator} from 'react-native';
import {selectPageLinksPromise} from '../sqlite/select';
import Header from '../componenets/Header';
import PostPreview from '../componenets/PostPreview';

import {guncelKaydet} from '../methods/veriKaydet';

// Son sayfaları kontrol et +
// Eklenmiş sayfa varsa sqle insert et +
// sayfaları sqlden çek +
// sasyfaları göster +
function Recently() {
  const [recentlyPosts, setRecentlyPosts] = useState([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [limit, setLimit] = useState(7);

  // bu method duzgun çalıyor
  function loadPosts() {
    selectPageLinksPromise().then((list) => {
      setRecentlyPosts(list);
      setRefreshStatus(false);
    });
  }

  function loadMore() {
    const newLimit = limit + 7;
    selectPageLinksPromise(newLimit).then((list) => {
      setRecentlyPosts(list);
      setLimit(newLimit);
    });
  }

  function refresh() {
    if (!refreshStatus) {
      setRefreshStatus(true);
      setLimit(7);
      loadPosts();
    }
  }

  // güncel verilere bakılıp yazılması
  useEffect(() => {
    loadPosts();
    guncelKaydet().then((veri) => {
      if (veri) loadPosts();
    });
  }, []);

  useEffect(() => {
    console.log('Recetly: ' + recentlyPosts.length);
  }, [recentlyPosts]);

  return (
    <React.Fragment>
      <Header title="Son Eklenen Duyurular" />
      {recentlyPosts.length ? (
        <FlatList
          data={recentlyPosts}
          renderItem={({item}) => <PostPreview data={item} />}
          keyExtractor={(item) => item.rowid.toString()}
          refreshing={refreshStatus}
          onRefresh={() => refresh()}
          // onEndReachedThreshold={2}
          onEndReached={() => loadMore()}
          ListFooterComponent={<ActivityIndicator color="#1d9b54" />}
        />
      ) : (
        <Text>Post Loading</Text>
      )}
    </React.Fragment>
  );
}

export default Recently;
