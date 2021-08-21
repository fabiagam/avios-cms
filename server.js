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
const PORT = process.env.PORT || 5001;
var corsOptions = {
  origin: "http://localhost:3000/",
  credentials: true,
  optionSuccessStatus: 200,
};
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

routes(app);
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: "Welcome to Avios Product Management application." });
});
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
app.use((req, res, next) => {
  return res.status(400).json({
    error: "Sorry, page not found",
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.info(` Avios Product Management Server is running on port ${PORT}.`);
  let localTime = moment().tz("Africa/Lagos").format("MMM D, YYYY h:ma z");
  console.info(`On ${localTime} `);
});
module.exports = app;
