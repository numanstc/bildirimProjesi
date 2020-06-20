import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'duyuru1.db', location: 'default'});

export default function createQuery(sql) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, results) => {
        resolve('DB oluşturuldu');
      });
    });
  });
}
