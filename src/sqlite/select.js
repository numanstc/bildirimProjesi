import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export function selectPageLinks(limit = 7, sayfaAtla) {
  let rows = [];
  // let sql;
  // if (!sayfaAtla) {
  //   sql = 'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' + limit;
  // } else {
  //   sql =
  //     'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' +
  //     limit +
  //     ', ' +
  //     limit * 2;
  // }
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

export function selectPageLinksPromise(limit) {
  return new Promise((resolve, reject) => {
    console.log('Limit Değeri:' + limit);
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
            console.log('Rows len:' + rows.length);

            resolve(rows);
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
  });
}

export function selectPageLinksCountPromise() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT COUNT(*) FROM PageLinks',
          [],
          (tx, results) => {
            console.log('PageLinks verisi sayma işlemi başarıyla sonuçlandı');

            console.log('Rows len:' + results.rows.item(0));

            resolve(results.rows.item(0));
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
  });
}

export function selectPageLinkWithSiraPromise(sira) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM PageLinks WHERE sira=' + sira,
          [],
          (tx, results) => {
            // console.log(
            //   `PageLinks sira = ${sira} verisi çekme işlemi başarıyla sonuçlandı`,
            // );
            resolve(results.rows.item(0));
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
  });
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
