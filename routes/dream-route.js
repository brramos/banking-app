const express = require("express");
const router = express.Router();

const {
  SELECT_ALL_DREAMS
} = require("../services/sql.constants");
const sql = require("../services/sql.service");
const db = sql.getDb();

const { cleanseString } = require("../extensions/string+extensions");

router.get("/getDreams", (request, response) => {
  db.all(SELECT_ALL_DREAMS, (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

router.post("/addDream", (request, response) => {
  console.log(`add to dreams ${request.body.dream}`);

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so they can write to the database
  if (!process.env.DISALLOW_WRITE) {
    const cleansedDream = cleanseString(request.body.dream);
    db.run(`INSERT INTO Dreams (dream) VALUES (?)`, cleansedDream, error => {
      if (error) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }
    });
  }
});

router.get("/clearDreams", (request, response) => {
  // DISALLOW_WRITE is an ENV variable that gets reset for new projects
  // so you can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.each(
      SELECT_ALL_DREAMS,
      (err, row) => {
        console.log("row", row);
        db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
          if (row) {
            console.log(`deleted row ${row.id}`);
          }
        });
      },
      err => {
        if (err) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

module.exports = router;
