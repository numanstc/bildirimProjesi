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
      console.error('PageLink Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Veriler Eklendi');
    },
  );
}

export function insertPage(page, pageLinkId) {
  db.transaction(
    (tx) => {
      tx.executeSql('INSERT INTO Pages VALUES (?, ?)', [
        page.mesaj,
        pageLinkId,
      ]);
    },
    (error) => {
      console.error('Page Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Page Verisi Eklendi');
      // db.transaction((tx) => {
      //   tx.executeSql('select last_insert_rowid()', [], (tx, result) => {
      //     console.log('Son eklenene Verinin idsi: ' + result.rows.item(0));
      //   });
      // });
    },
  );
}
