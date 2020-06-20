import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export async function create() {
  db.transaction(
    (tx) => {
      // tx.executeSql('DROP TABLE IF EXISTS Users', []);
      // pageLinks tablosu
      // sira int
      // link varchar(255)
      // mesaj varchar(255)
      // yayinTarihi varchar(10)
      // sonYayintarihi varchar(10)
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS PageLinks(sira INTEGER, link VARCHAR(255), mesaj VARCHAR(255), yayinTarihi VARCHAR(10), sonYayinTarihi VARCHAR(10))',
        [],
      );

      // page tablosus
      // mesaj Text
      // pageLinId int
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Pages(mesaj TEXT, pageLinkId INTEGER)',
        [],
      );

      // images
      // alt text
      // height int
      // width int
      // pageId integer
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Images(mesaj VARCHAR(255), height INTEGER, width INTEGER, src VARCHAR(255), pageId INTEGER)',
        [],
      );

      // links
      // name varchar(255)
      // link varchar(255)
      // pageId integer
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Links(name VARCHAR(255), link VARCHAR(255), pageId INTEGER)',
        [],
      );

      // extras
      // name varchar(255)
      // link varchar(255)
      // pageId integer
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Extras(name VARCHAR(255), link VARCHAR(255), pageId INTEGER)',
        [],
      );
    },
    function (error) {
      console.log('Transaction ERROR: ' + error.message);
    },
    function () {
      console.log('Populated database OK');
    },
  );
}
