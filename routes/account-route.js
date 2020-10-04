const express = require("express");
const request = require("request");
const router = express.Router();

const Account = require('../models/account')

const checkingAccount = new Account('Billy Ramos', 'checking', 400)
checkingAccount.id = '1997c20e-c321-4eea-b374-62a022b433db'

const savingAccount = new Account('Billy Ramos', 'savings', 200)
savingAccount.id = '26ef455d-7b3b-4f1d-9c5d-5afcbfb790b6'

const accounts = [checkingAccount, savingAccount]

router.get("/", (request, response) => {
  response.json(accounts)
});

router.post('/', (req, res) => {
  const {
    name,
    accountType,
    balance
  } = req.body
  
  const account = new Account(name, accountType, balance)
  account.save(accounts, (newAccount, error) => {
    if (newAccount) {
      accounts.push(newAccount)
      res.json({success: true})
    } else {
      res.json({success: false, error})
    }
  })
})

module.exports = router;

