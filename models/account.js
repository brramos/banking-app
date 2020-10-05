const uuidv4 = require('../utils/uuidv4')

class Account {
  constructor(name, accountType, balance) {
    this.id = ''
    this.name = name
    this.accountType = accountType
    this.balance = balance
  }

  save(accounts, completion) {
    const account = this.getAccountByNameAndType(accounts, this.name, this.accountType)
    if (!account) {
      this.id = uuidv4()
      completion(this)
    } else {
      completion(null, 'User already has this type of account')
    }
  }

  getAccountByNameAndType(accounts, name, type) {
    return accounts.find(account => account.name === name && account.accountType === type)
  }

  transfer(toAccount, amount, completion) {
    if (this.balance - amount < 0) {
      completion(false, 'Insufficient funds!')
      return
    }

    this.withdraw(amount)
    toAccount.deposit(amount)
    completion(true)
  }

  deposit(amount) {
    this.balance += amount
  }

  withdraw(amount) {
    this.balance -= amount
  }
}

module.exports = Account
