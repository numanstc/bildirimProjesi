import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export function insertPageLinks(pages) {
  db.transaction(
    (tx) => {
      pages.forEach((page) => {
        tx.executeSql('REPLACE INTO PageLinks VALUES (?, ?, ?, ?, ?)', [
          page.sira,
          page.link,
          page.mesaj,
          page.yayinTarihi,
          page.sonYayinTarihi,
        ]);
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

export async function insertPage(mesaj, pageLinkId) {
  db.transaction(
    (tx) => {
      if (mesaj === undefined || mesaj.trim() === 0) {
        tx.executeSql('REPLACE INTO Pages VALUES (?, ?)', [null, pageLinkId]);
      } else {
        tx.executeSql('REPLACE INTO Pages VALUES (?, ?)', [
          mesaj.trim(),
          pageLinkId,
        ]);
      }
    },
    (error) => {
      console.error('Page Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Page Verisi Eklendi');
    },
  );
}

export function insertUl(ul, pageId) {
  db.transaction(
    (tx) => {
      tx.executeSql('REPLACE INTO ul VALUES (?, ?)', [ul, pageId]);
    },
    (error) => {
      console.error('ul Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('ul Verisi Eklendi');
    },
  );
}

export function insertImage(image, pageId) {
  db.transaction(
    (tx) => {
      tx.executeSql('REPLACE INTO Images VALUES (?, ?, ?, ?, ?)', [
        image.mesaj,
        image.height,
        image.width,
        image.src,
        pageId,
      ]);
    },
    (error) => {
      console.error('Image Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Image Verisi Eklendi');
    },
  );
}

export function insertLink(link, pageId) {
  db.transaction(
    (tx) => {
      tx.executeSql('REPLACE INTO Links VALUES (?, ?, ?)', [
        link.name,
        link.link,
        pageId,
      ]);
    },
    (error) => {
      console.error('Links Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Links Verisi Eklendi');
    },
  );
}

export function insertExtra(extra, pageId) {
  db.transaction(
    (tx) => {
      tx.executeSql('REPLACE INTO Extras VALUES (?, ?, ?)', [
        extra.name,
        extra.link,
        pageId,
      ]);
    },
    (error) => {
      console.error('Extras Ekleme Hatası: ' + error.message);
    },
    () => {
      console.log('Extras Verisi Eklendi');
    },
  );
}
