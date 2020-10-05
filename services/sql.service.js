const fs = require("fs");
const dbFile = ".data/sqlite2.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
const {
  CREATE_DREAMS_TABLE,
  INSERT_INTO_DREAMS,
  SELECT_ALL_DREAMS,
  account
} = require("./sql.constants.js");
const {
  CREATE_ACCOUNT_TABLE,
  INSERT_INTO_ACCOUNT,
  SELECT_ALL_ACCOUNTS
} = account

const init = () => {
  // if ./.data/sqlite.db does not exist, create it, otherwise print records to console
  db.serialize(() => {
    if (!exists) {
      db.run(CREATE_DREAMS_TABLE);
      console.log("New table Dreams created!!");

      // insert default dreams
      db.serialize(() => {
        db.run(INSERT_INTO_DREAMS);

        db.serialize(() => {
          db.run(CREATE_ACCOUNT_TABLE);

          db.serialize(() => {
            db.run(INSERT_INTO_ACCOUNT);

          });
        });
      });
    } else {
      console.log('Database "Dreams" ready to go!!');
      db.each(SELECT_ALL_DREAMS, (err, row) => {
        if (row) {
          console.log(`record: ${row.dream}`);
        }
      });
    }
  });
};

const getDb = () => db

module.exports = {
  init,
  getDb
};
