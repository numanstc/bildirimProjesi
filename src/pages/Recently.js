import React, {useEffect, useState} from 'react';
import {FlatList, Text, ActivityIndicator, View} from 'react-native';
import {
  selectPageLinksPromise,
  selectPageLinksCountPromise,
} from '../sqlite/select';
import Header from '../componenets/Header';
import PostPreview from '../componenets/PostPreview';

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
    console.log('newLimit:' + newLimit);
    // return selectPageLinksPromise(newLimit).then((list) => {
    //   setRecentlyPosts(list);
    //   setLimit(newLimit);
    //   selectPageLinksCountPromise().then((count) => {
    //     console.log('List Count: ');
    //     for (let property in count) {
    //       console.log(property + '=' + count[property]);
    //     }
    //   });
    // });

    const newPage = page + 1;
    return eskiDataKaydet(newPage).then(() => {
      setPage(newPage);
      return selectPageLinksPromise(newLimit).then((list) => {
        setRecentlyPosts(list);
        setLimit(newLimit);
        selectPageLinksCountPromise().then((count) => {
          console.log('List Count: ');
          for (let property in count) {
            console.log(property + '=' + count[property]);
          }
        });
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

  // useEffect(() => {
  //   console.log('Recetly: ' + recentlyPosts.length);
  // }, [recentlyPosts]);

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
          // onEndReachedThreshold={2}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.3}
          ListFooterComponent={footer}
        />
      ) : (
        <Text>Post Loading</Text>
      )}
    </React.Fragment>
  );
}

export default Recently;
