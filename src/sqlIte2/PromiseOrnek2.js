let SQLite = require('react-native-sqlite-storage');
const DB = SQLite.openDatabase({
  name: 'test.db',
  createFromLocation: '~sqlitedb.db',
});

class Database {
  // db;
  constructor(db) {
    this.db = db;
  }
  executeSql = (sql, params = []) =>
    new Promise((resolve, reject) => {
      this.db.transaction((trans) => {
        trans.executeSql(
          sql,
          params,
          (db, results) => {
            resolve(results);
          },
          (error) => {
            reject(error);
          },
        );
      });
    });
}
export default new Database(DB);
