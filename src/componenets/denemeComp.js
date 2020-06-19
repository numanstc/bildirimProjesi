import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {create} from '../sqlite/create';
import {selectPageLinks} from '../sqlite/select';
import {insertPageLinks} from '../sqlite/insert';
import {openDatabase} from 'react-native-sqlite-storage';

export default function DenemeComp() {
  const [pageLink, setPageLink] = useState([
    {
      rowid: '',
      link: '',
      mesaj: '',
      sira: 0,
      yayinTarihi: '',
      sonYayinTarihi: '',
    },
  ]);
  // const [pageLink, setPageLink] = useState({
  //   data: [
  //     {
  //       link: '',
  //       mesaj: '',
  //       sira: 0,
  //       yayinTarihi: '',
  //       sonYayinTarihi: '',
  //     },
  //   ],
  // });
  const [load, setLoad] = useState(false);
  const [dbEkle, setDbEkle] = useState(false);

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
  // useEffect(() => {
  //   create();
  //   insertPageLinks(deger, 10);
  // }, [dbEkle]);

  useEffect(() => {
    if (load) setPageLink(selectPageLinks());
    // pageLink.map((page) => console.log(page.mesaj));
  }, [load]);

  return (
    <View>
      {pageLink.map((page, index) => (
        <Text key={page.rowid}>{page.mesaj}</Text>
      ))}
      <View>
        <TouchableOpacity
          onPress={() => {
            setLoad(!load);
          }}>
          <Text>göster/gizle</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Yazı</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setDbEkle(!dbEkle);
          }}>
          <Text>Db Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
