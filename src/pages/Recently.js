import React, {useEffect, useState} from 'react';
import {FlatList, Alert, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {selectPageLinks, selectPageLinksPromise} from '../sqlite/select';
import Header from '../componenets/Header';
import useVeriKaydet from '../hooks/useVeriKaydet';
import {pageLinks} from '../webScraping/pageLinks';

// Son sayfaları kontrol et
// Eklenmiş sayfa varsa sqle insert et
// sayfaları sqlden çek
// sasyfaları göster
function Recently() {
  const [recentlyPosts, setRecentlyPosts] = useState([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
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

  const kaydediliyor = useVeriKaydet(); // ek veri varsa bul ve kayıt et
  useEffect(() => {
    if (!kaydediliyor) {
      loadPosts();
      console.log(recentlyPosts);
      console.log('kaydediliyor: ' + kaydediliyor);
    }
  }, [kaydediliyor]);

  // useEffect(() => {
  //   // setRecentlyPosts(selectPageLinks());
  //   loadPosts();
  // }, []);

  // useEffect(() => {
  //   checkConnection();
  // }, []);

  useEffect(() => {
    console.log('Recetly: ' + recentlyPosts.length);
  }, [recentlyPosts]);
  return (
    <React.Fragment>
      <Header title="Son Eklenen İlanlar" />
      {recentlyPosts.length ? (
        <FlatList
          data={recentlyPosts}
          renderItem={(item) => (
            <View>
              <Text>Data</Text>
            </View>
          )}
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
