import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export function create() {
  db.transaction(
    (tx) => {
      // tx.executeSql('DROP TABLE IF EXISTS Users', []);
      // pageLinks tablos
      // id int
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
      // id int
      // mesaj Text
      // pageLinId int
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Pages(id INTEGER PRIMARY KEY NOT NULL, mesaj TEXT, pageLinkId INTEGER)',
        [],
      );

      // images
      // id int
      // alt text
      // height int
      // width int
      // pageId integer
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Page(id INTEGER PRIMARY KEY NOT NULL, mesaj VARCHAR(255), height INTEGER, width INTEGER, src VARCHAR(255), pageId INTEGER)',
        [],
      );

      // links
      // id int
      // name varchar(255)
      // link varchar(255)
      // pageId integer
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Page(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(255), link VARCHAR(255), pageId INTEGER)',
        [],
      );

      // eks
      // name varchar(255)
      // link varchar(255)
      // pageId integer
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Page(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(255), link VARCHAR(255), pageId INTEGER)',
        [],
      );

      // tx.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Fatih']);
    },
    function (error) {
      console.log('Transaction ERROR: ' + error.message);
    },
    function () {
      console.log('Populated database OK');
    },
  );
}
