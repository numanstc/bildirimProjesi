import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {selectPageLinks, selectPageLinksPromise} from '../sqlite/select';
import {insertPageLinks, insertPage} from '../sqlite/insert';
import useDuyuruKontrol from '../hooks/useDuyuruKontrol';
import useInsertPageLink from '../hooks/useInsertPageLink';

export default function DenemeComp() {
  const [pageLink, setPageLink] = useState([]);
  const [page, setPage] = useState({});
  const [insertPageBool, setInsertPageBool] = useState(true);

  const [fark, setFark] = useState(0);
  const [load, setLoad] = useState(false);

  // const isInsert = useInsertPageLink({sira: 15, page: 1, bas: 0, bit: 7});

  // const [kontrolEt, loading] = useDuyuruKontrol();
  // useEffect(() => {
  //   if (!loading) {
  //     console.log('Hook çağırıldı deger:' + kontrolEt);
  //     console.log('Hook çağırıldı load:' + loading);
  //   }
  // }, [loading, kontrolEt]);

  // useEffect(() => {
  //   if (insertPageBool) {
  //     // insertPage(pageDeger, 1);
  //     setInsertPageBool(false);
  //   }

  //   setPage(selectPage(1));
  //   console.log('SetPage çalıştı');
  // }, [insertPageBool]);

  // if (isInsert) {
  //   return (
  //     <View>
  //       <Text>İnserting</Text>
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   if (load) {
  //   }
  //   // pageLink.map((page) => console.log(page.mesaj));
  // }, [load]);

  // import edilmeden çalışmıyor
  // useEffect(() => {
  //   setPageLink(selectPageLinks());
  //   console.log('Page link len:' + pageLink.length);
  // }, []);

  useEffect(() => {
    selectPageLinksPromise(7).then((list) => setPageLink(list));
  }, []);

  // useEffect(() => {
  // }, pageLink);
  return (
    <View>
      {pageLink.map((page, index) => (
        <Text key={page.rowid}>
          {page.rowid} {page.mesaj}
        </Text>
      ))}
      <View>
        <Text>Yazı</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setInsertPageBool(!insertPageBool);
          }}>
          <Text>Page Ekle</Text>
        </TouchableOpacity>
      </View>
      <View>{!insertPageBool && <Text>{page.text}</Text>}</View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setInsertPageBool(!insertPageBool);
          }}>
          <Text>Page Ekle</Text>
        </TouchableOpacity>
      </View>
      {/* <View>{kontrolEt === true ? <Text>true</Text> : <Text>false</Text>}</View> */}
    </View>
  );
}
