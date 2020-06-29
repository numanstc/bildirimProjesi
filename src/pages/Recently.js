import React, {useEffect, useState} from 'react';
import {FlatList, Text, ActivityIndicator, View} from 'react-native';
import {selectPageLinksPromise} from '../sqlite/select';
import Header from '../components/Header';
import PostPreview from '../components/PostPreview';
import PostsLoad from '../components/PostsLoad';

import {guncelKaydet, eskiDataKaydet} from '../methods/veriKaydet';

// Son sayfaları kontrol et +
// Eklenmiş sayfa varsa sqle insert et +
// sayfaları sqlden çek +
// sasyfaları göster +
function Recently() {
  const [recentlyPosts, setRecentlyPosts] = useState([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  // bu method duzgun çalıyor
  function loadPosts() {
    selectPageLinksPromise(15).then((list) => {
      setRecentlyPosts(list);
      setRefreshStatus(false);
    });
  }

  function loadMore() {
    const newLimit = limit + 15;

    const newPage = page + 1;
    return eskiDataKaydet(newPage).then(() => {
      setPage(newPage);
      return selectPageLinksPromise(newLimit).then((list) => {
        setRecentlyPosts(list);
        setLimit(newLimit);
      });
    });
  }

  function refresh() {
    if (!refreshStatus) {
      setRefreshStatus(true);
      setLimit(15);
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

  const footer = () => {
    return (
      <View style={{padding: 20, borderWidth: 1, borderTopColor: '#CDE0CE'}}>
        <ActivityIndicator animating size="large" color="#1d9b54" />
      </View>
    );
  };

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
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.3}
          ListFooterComponent={footer}
        />
      ) : (
        <PostsLoad />
      )}
    </React.Fragment>
  );
}

export default Recently;
