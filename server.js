const express = require("express");
const app = express();

const sql = require('./services/sql.service')
sql.init()

const dream = require('./routes/dream-route')
const account = require('./routes/account-route')
const transfer = require('./routes/transfer-route')

app.use(express.json());

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.use('/api/dream', dream);
app.use('/api/accounts', account)
app.use('/api/transfer', transfer)

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
