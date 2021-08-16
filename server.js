/***********************************************
 * @name: Avios - Product Management App
 * @author: James Ndidi Abiagam
 * @file: server.js
 ***********************************************/
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const moment = require("moment-timezone");
const db = require("./models/");
const routes = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
var corsOptions = {
  origin: process.env.APP_HOST,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Avios Product Management application." });
});
app.use((req, res, next) => {
  return res.status(400).json({
    error: "Sorry, page not found",
  });
});
app.listen(PORT, () => {
  console.info(` Avios Product Management Server is running on port ${PORT}.`);
  let localTime = moment().tz("Africa/Lagos").format("MMM D, YYYY h:ma z");
  console.info(`On ${localTime} `);
});
module.exports = app;
