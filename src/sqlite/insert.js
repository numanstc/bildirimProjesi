import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export function insertPageLinks(pages, toplamVeri) {
  let sira = toplamVeri;
  db.transaction(
    (tx) => {
      pages.forEach((page) => {
        tx.executeSql('INSERT INTO PageLinks VALUES (?, ?, ?, ?, ?)', [
          sira,
          page.link,
          page.mesaj,
          page.yayinTarihi,
          page.sonYayinTarihi,
        ]);
        sira -= 1;
      });
    },
    (error) => {
      console.error('Veri Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Veriler Eklendi');
    },
  );
}
