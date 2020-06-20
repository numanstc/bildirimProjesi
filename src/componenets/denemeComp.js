import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {selectPageLinks, selectPage} from '../sqlite/select';
import {insertPageLinks, insertPage} from '../sqlite/insert';
import useDuyuruKontrol from '../hooks/useDuyuruKontrol';

export default function DenemeComp() {
  const [pageLink, setPageLink] = useState([]);

  const [page, setPage] = useState({
    text: '',
    link: [],
    image: [],
    ek: [],
  });

  const [load, setLoad] = useState(false);
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

  // const pageDeger = [
  //   {
  //     text:
  //       ' Aşağıdaki öğrencilerin Proje 2 dersini hangi hocadan alacaklar ise örnek dilekçeyi doldurup imzalı olarak bölüm sekreterliğine en geç 28 Şubat Cuma günü mesai bitimine kadar ulaştırması gerekmektedir. Öğrenci listesi : 060401024 Sedat Şanan  060401031 Bahattin Carav  090401005 Selman Şahiner  100401048 Oğuz Kılıç  110401049 Adem Altungeyik  130401042 Bahar ÇİFTÇİ  130401055 Nurşah Koç  130401074 Augusto Gomes Junior  150401055 Numan SATICI  150401015 Enes Bal   150401059 İsmail Oğuzcan ARSLAN  150401069 Mustafa Burak Kılıç',
  //     link: [
  //       {
  //         name: 'Dilekçe örneği',
  //         link:
  //           'https://cdn.comu.edu.tr/cms/muhendislik.ce/files/132-proje-ii-dilekcesi.pdf',
  //       },
  //       {
  //         name: 'View this pdf file',
  //         link:
  //           'https://docs.google.com/viewer?url=https%3A%2F%2Fcdn.comu.edu.tr%2Fcms%2Fmuhendislik.ce%2Ffiles%2F132-proje-ii-dilekcesi.pdf&embedded=true&chrome=false&dov=1',
  //       },
  //     ],
  //     image: [],
  //     ek: [],
  //   },
  // ];

  useEffect(() => {
    insertPageLinks(deger, 10);

    setPageLink(selectPageLinks());
    setLoad(true);
  }, []);

  // const kontrolEt = useDuyuruKontrol();

  // useEffect(() => {
  //   if (insertPageBool) {
  //     insertPage(pageDeger, 1);
  //     setInsertPageBool(false);
  //   }

  //   setPage(selectPage(1));
  //   console.log('SetPage çalıştı');
  // }, [insertPageBool]);

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
