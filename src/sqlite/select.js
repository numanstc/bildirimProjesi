import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export function selectPageLinks(limit = 7) {
  let rows = [];
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' + limit,
        [],
        (tx, results) => {
          console.log('PageLinks verisi çekme işlemi başarıyla sonuçlandı');
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            rows.push(row);
            // console.log('item:', results.rows.item(i));
          }
        },
        function (tx, error) {
          console.error('PageLinks Select Sql Error: ' + error.message);
        },
      );
    },
    (error) => {
      console.error('PageLinks Select Transection Error: ' + error.message);
    },
    () => {
      console.log('PageLinks Verileri Çekildi');
    },
  );

  return rows;
}

export function selectPage(pageLinkId) {
  let rows = [];
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT rowid, * FROM Pages WHERE pageLinkId= ' + pageLinkId,
        [],
        (tx, results) => {
          console.log('Page verisi çekme işlemi başarıyla sonuçlandı');
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            rows.push(row);
            // console.log('item:', results.rows.item(i));
          }
        },
        function (tx, error) {
          console.error('Page Select Sql Error: ' + error.message);
        },
      );
    },
    (error) => {
      console.error('Page Select Transection Error: ' + error.message);
    },
    () => {
      console.log('Page Veriler Çekildi');
    },
  );

  return rows;
}

export function select() {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
      for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(0);
        // this.setState({getvalue: row.name});
        console.log('name: ' + row.name);

        console.log('item:', results.rows.item(i));
      }
    });
  });
}
