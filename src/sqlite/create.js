import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export default function create() {
  const sql = [
    {
      sql:
        'CREATE TABLE IF NOT EXISTS PageLinks(sira INTEGER, link VARCHAR(255), mesaj VARCHAR(255), yayinTarihi VARCHAR(10), sonYayinTarihi VARCHAR(10))',
      name: 'PageLinks',
    },
    {
      sql: 'CREATE TABLE IF NOT EXISTS Pages(mesaj TEXT, pageLinkId INTEGER)',
      name: 'Pages',
    },
    {
      sql: 'CREATE TABLE IF NOT EXISTS ul(mesaj VARCHAR(255), pageId INTEGER)',
      name: 'Images',
    },
    {
      sql:
        'CREATE TABLE IF NOT EXISTS Images(mesaj VARCHAR(255), height INTEGER, width INTEGER, src VARCHAR(255), pageId INTEGER)',
      name: 'Images',
    },
    {
      sql:
        'CREATE TABLE IF NOT EXISTS Links(name VARCHAR(255), link VARCHAR(255), pageId INTEGER)',
      name: 'Links',
    },
    {
      sql:
        'CREATE TABLE IF NOT EXISTS Extras(name VARCHAR(255), link VARCHAR(255), pageId INTEGER)',
      name: 'Extras',
    },
  ];

  sql.map((table) => {
    db.transaction((tx) => {
      tx.executeSql(table.sql, [], (tx, results) => {
        // resolve(name + ' tablo sorgusu başarıyla çalıştı.');
        console.log(table.name + ' tablo sorgusu başarıyla çalıştı.');
      });
    });
  });
}

// Notes

// pageLinks tablosu
// sira int
// link varchar(255)
// mesaj varchar(255)
// yayinTarihi varchar(10)
// sonYayintarihi varchar(10)

// page tablosu
// mesaj Text
// pageLinId int

//ul
// mesaj text
// pageId integer

// images tablosu
// mesaj text
// height int
// width int
// pageId integer

// links tablosu
// name varchar(255)
// link varchar(255)
// pageId integer

// extras tablosu
// name varchar(255)
// link varchar(255)
// pageId integer
