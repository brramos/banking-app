const express = require("express");
const router = express.Router();

const Account = require('../models/account')
const {
  account
} = require("../services/sql.constants");
const {
  CREATE_ACCOUNT_TABLE,
  INSERT_INTO_ACCOUNT,
  INSERT_ACCOUNT,
  SELECT_ALL_ACCOUNTS,
  UPDATE_BALANCE
} = account
const sql = require("../services/sql.service");
const db = sql.getDb();

router.post('/', (req, res) => {
  const {
    accountFromId,
    accountToId,
    amount
  } = req.body

  db.all(SELECT_ALL_ACCOUNTS, (err, accounts) => {
    const from = accounts.find(account => account.id === accountFromId)
    const to = accounts.find(account => account.id === accountToId)
    const fromAccount = new Account(from.name, from.accountType, from.balance)
    const toAccount = new Account(to.name, to.accountType, to.balance)

    fromAccount.transfer(toAccount, amount, (transferred, error) => {
      if (transferred) {
        // DISALLOW_WRITE is an ENV variable that gets reset for new projects
        // so they can write to the database
        if (!process.env.DISALLOW_WRITE) {
          // todo: update balance for both accounts
          db.run(UPDATE_BALANCE, [fromAccount.balance, accountFromId], updateFromError => {
            if (updateFromError) {
              res.send({success: false, updateFromError});
            } else {
              db.run(UPDATE_BALANCE, [toAccount.balance, accountToId], updateToError => {
                if (updateToError) {
                  res.send({success: false, updateToError});
                } else {
                  res.send({success: true});
                }
              });
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
