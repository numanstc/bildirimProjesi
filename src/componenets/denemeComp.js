import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {selectPageLinks, selectPage} from '../sqlite/select';
import {insertPageLinks, insertPage} from '../sqlite/insert';
import useDuyuruKontrol from '../hooks/useDuyuruKontrol';
import useInsertPageLink from '../hooks/useInsertPageLink';

export default function DenemeComp() {
  const [pageLink, setPageLink] = useState([]);

  const [page, setPage] = useState({
    text: '',
    link: [],
    image: [],
    ek: [],
  });

  const [insertPageBool, setInsertPageBool] = useState(true);
  const deger = [
    {
      link:
        'http://ce.muhendislik.comu.edu.tr/arsiv/duyurular/turk-dili-final-sinavi-r571.html',
      mesaj: 'TÜRK DİLİ FİNAL SINAVI',
      yayinTarihi: '12.05.2020',
      sonYayinTarihi: '02.06.2020',
    },
    {
      link:
        'http://ce.muhendislik.comu.edu.tr/arsiv/duyurular/onkosul-2019-2020-egitim-ogretim-yili-ve-sonrasind-r536.html',
      mesaj:
        'ÖNKOŞUL (2019-2020 Eğitim öğretim yılı ve sonrasında kayıtlı öğrenciler için)',
      yayinTarihi: '27.09.2019',
      sonYayinTarihi: '31.07.2020',
    },
  ];
  const isInsert = useInsertPageLink({sira: 15, page: 1, bas: 0, bit: 7});

  useEffect(() => {
    // insertPageLinks(deger, 10);

    setPageLink(selectPageLinks());
  }, [isInsert]);

  // const [kontrolEt, loading] = useDuyuruKontrol();
  // if (!loading) {
  //   console.log('Hook çağırıldı deger:' + kontrolEt);
  //   console.log('Hook çağırıldı load:' + loading);
  // }

  // useEffect(() => {
  //   if (insertPageBool) {
  //     insertPage(pageDeger, 1);
  //     setInsertPageBool(false);
  //   }

  //   setPage(selectPage(1));
  //   console.log('SetPage çalıştı');
  // }, [insertPageBool]);

  if (isInsert) {
    return (
      <View>
        <Text>İnserting</Text>
      </View>
    );
  }

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
