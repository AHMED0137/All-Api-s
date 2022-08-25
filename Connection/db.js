const express = require("express");
const mongos = require("mongoose");
require("dotenv").config();

const app = express();
const connection = mongos
  .connect(process.env.MONGOS_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("database connected to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
