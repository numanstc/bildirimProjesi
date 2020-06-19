import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export function selectPageLinks(lenght = 7) {
  let rows = [];
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' + lenght,
        [],
        (tx, results) => {
          console.log('Veri çekme işlemi başarıyla sonuçlandı');
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            rows.push(row);
            // console.log('item:', results.rows.item(i));
          }
        },
        function (tx, error) {
          console.error('Transection Error: ' + error.message);
        },
      );
    },
    (error) => {
      console.error('Veri Çekme Hatası: ' + error.message);
    },
    () => {
      console.log('Veriler Çekildi');
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
