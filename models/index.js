/***********************************************
 * @name: Avios Database Connection
 * @author: James Ndidi Abiagam
 * @file: config/db.js
 ***********************************************/
"use strict";

const dbo = require("../config/db");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbo.DATABASE, dbo.USER, dbo.PASSWORD, {
  host: dbo.HOST,
  dialect: dbo.DIALECT,
  pool: {
    max: dbo.pool.max,
    min: dbo.pool.min,
    acquire: dbo.pool.acquire,
    idle: dbo.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require("./Product")(sequelize, Sequelize);

module.exports = db;
