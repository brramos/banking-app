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
  SELECT_ALL_ACCOUNTS
} = account

router.post('/', (req, res) => {
  const {
    accountFromId,
    accountToId,
    amount
  } = req.body

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.run(INSERT_ACCOUNT, cleansedDream, error => {
      if (error) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }
    });
  }
})

module.exports = router;
