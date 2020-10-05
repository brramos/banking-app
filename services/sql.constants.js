module.exports = {
  CREATE_DREAMS_TABLE: 'CREATE TABLE Dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, dream TEXT)',
  INSERT_INTO_DREAMS: 'INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")',
  SELECT_ALL_DREAMS: 'SELECT * from Dreams',
  account: {
    CREATE_ACCOUNT_TABLE: 'CREATE TABLE Account (id TEXT PRIMARY KEY, name TEXT, accountType TEXT, balance REAL)',
    INSERT_INTO_ACCOUNT: 'INSERT INTO Account (id, name, accountType, balance) VALUES ("1997c20e-c321-4eea-b374-62a022b433db", "Billy Ramos", "checking", 420), ("26ef455d-7b3b-4f1d-9c5d-5afcbfb790b6", "Billy Ramos", "savings", 200)',
    INSERT_ACCOUNT: 'INSERT INTO Account (id, name, accountType, balance) VALUES (?, ?, ?, ?)',
    SELECT_ALL_ACCOUNTS: 'SELECT * from Account',
    UPDATE_BALANCE: 'UPDATE Account SET balance = ? WHERE id = ?'
  }
}
