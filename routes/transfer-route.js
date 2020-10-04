const express = require("express");
const request = require("request");
const router = express.Router();

const Account = require('../models/account')

router.post('/', (req, res) => {
  const {
    accountFromId,
    accountToId,
    amount
  } = req.body
  
  
})

module.exports = router;
