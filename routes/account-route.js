const express = require("express");
const router = express.Router();

const Account = require('../models/account')
const {
  account
} = require("../services/sql.constants");
const {
  INSERT_ACCOUNT,
  SELECT_ALL_ACCOUNTS
} = account
const sql = require("../services/sql.service");
const db = sql.getDb();

router.get("/", (request, response) => {
  db.all(SELECT_ALL_ACCOUNTS, (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

router.post('/', (req, res) => {
  const {
    name,
    accountType,
    balance
  } = req.body

  db.all(SELECT_ALL_ACCOUNTS, (err, accounts) => {
    const account = new Account(name, accountType, balance)
    account.save(accounts, (newAccount, error) => {
      if (newAccount) {
        // DISALLOW_WRITE is an ENV variable that gets reset for new projects
        // so they can write to the database
        if (!process.env.DISALLOW_WRITE) {
          db.run(INSERT_ACCOUNT, [newAccount.id, newAccount.name, newAccount.accountType, newAccount.balance], insertError => {
            if (insertError) {
              res.send({success: false, insertError});
            } else {
              res.send({success: true});
            }
          });
        }
      } else {
        res.json({success: false, error})
      }
    })
  });

})

module.exports = router;

