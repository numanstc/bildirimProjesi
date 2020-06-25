import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

// export function selectPageLinks(limit = 7, sayfaAtla) {
//   let rows = [];
//   // let sql;
//   // if (!sayfaAtla) {
//   //   sql = 'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' + limit;
//   // } else {
//   //   sql =
//   //     'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' +
//   //     limit +
//   //     ', ' +
//   //     limit * 2;
//   // }
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' + limit,
//         [],
//         (tx, results) => {
//           console.log('PageLinks verisi çekme işlemi başarıyla sonuçlandı');
//           for (var i = 0; i < results.rows.length; i++) {
//             var row = results.rows.item(i);
//             rows.push(row);
//             // console.log('item:', results.rows.item(i));
//           }
//         },
//         function (tx, error) {
//           console.error('PageLinks Select Sql Error: ' + error.message);
//         },
//       );
//     },
//     (error) => {
//       console.error('PageLinks Select Transection Error: ' + error.message);
//     },
//     () => {
//       console.log('PageLinks Verileri Çekildi');
//     },
//   );

//   return rows;
// }

export function selectPageLinksPromise(limit) {
  return new Promise((resolve, reject) => {
    let rows = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM PageLinks ORDER BY sira DESC LIMIT ' + limit,
          [],
          (tx, results) => {
            console.log(
              'PageLinks tablosundan veri çekme işlemi başarıyla sonuçlandı',
            );
            for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              rows.push(row);
              // console.log('item:', results.rows.item(i));
            }

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
            console.log(
              'PageLinks tablosundan veri sayma işlemi başarıyla sonuçlandı',
            );

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

export function selectPagePromise(pageLinkId) {
  return new Promise((resolve, reject) => {
    let rows = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM Pages WHERE pageLinkId= ' + pageLinkId,
          [],
          (tx, results) => {
            console.log(
              'Pages tablosundan veri çekme işlemi başarıyla sonuçlandı',
            );
            for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              rows.push(row);
              // console.log('item:', results.rows.item(i));
            }
            resolve(rows);
          },
          function (tx, error) {
            console.error('Pages Select Sql Error: ' + error.message);
          },
        );
      },
      (error) => {
        console.error('Pages Select Transection Error: ' + error.message);
      },
      () => {
        console.log('Pages Veriler Çekildi');
      },
    );

    return rows;
  });
}

export function selectUlPromise(pageId) {
  return new Promise((resolve, reject) => {
    let rows = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM ul WHERE pageId= ' + pageId,
          [],
          (tx, results) => {
            console.log(
              'Ul tablosundan veri çekme işlemi başarıyla sonuçlandı',
            );
            for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              rows.push(row);
              // console.log('item:', results.rows.item(i));
            }
            resolve(rows);
          },
          function (tx, error) {
            console.error('Ul Select Sql Error: ' + error.message);
          },
        );
      },
      (error) => {
        console.error('Ul Select Transection Error: ' + error.message);
      },
      () => {
        console.log('Ul Veriler Çekildi');
      },
    );
    return rows;
  });
}

export function selectImagesPromise(pageId) {
  return new Promise((resolve, reject) => {
    let rows = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM Images WHERE pageId= ' + pageId,
          [],
          (tx, results) => {
            console.log(
              'Images tablosundan veri çekme işlemi başarıyla sonuçlandı',
            );
            for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              rows.push(row);
              // console.log('item:', results.rows.item(i));
            }
            resolve(rows);
          },
          function (tx, error) {
            console.error('Images Select Sql Error: ' + error.message);
          },
        );
      },
      (error) => {
        console.error('Images Select Transection Error: ' + error.message);
      },
      () => {
        console.log('Images Veriler Çekildi');
      },
    );
    return rows;
  });
}

export function selectLinksPromise(pageId) {
  return new Promise((resolve, reject) => {
    let rows = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM Links WHERE pageId= ' + pageId,
          [],
          (tx, results) => {
            console.log(
              'Links tablosundan veri çekme işlemi başarıyla sonuçlandı',
            );
            for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              rows.push(row);
              // console.log('item:', results.rows.item(i));
            }
            resolve(rows);
          },
          function (tx, error) {
            console.error('Links Select Sql Error: ' + error.message);
          },
        );
      },
      (error) => {
        console.error('Links Select Transection Error: ' + error.message);
      },
      () => {
        console.log('Links Veriler Çekildi');
      },
    );

    return rows;
  });
}

export function selectExtrasPromise(pageId) {
  return new Promise((resolve, reject) => {
    let rows = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT rowid, * FROM Extras WHERE pageId= ' + pageId,
          [],
          (tx, results) => {
            console.log(
              'Extras tablosundan veri çekme işlemi başarıyla sonuçlandı',
            );
            for (var i = 0; i < results.rows.length; i++) {
              var row = results.rows.item(i);
              rows.push(row);
              // console.log('item:', results.rows.item(i));
            }
            resolve(rows);
          },
          function (tx, error) {
            console.error('Extras Select Sql Error: ' + error.message);
          },
        );
      },
      (error) => {
        console.error('Extras Select Transection Error: ' + error.message);
      },
      () => {
        console.log('Extras Veriler Çekildi');
      },
    );

    return rows;
  });
}
