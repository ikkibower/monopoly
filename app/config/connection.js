// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************
// var env = process.env.NODE_ENV || 'development';

// var creds = require("config.json")[env];
// Dependencies
var Sequelize = require("sequelize");


// Creates mySQL connection using Sequelize

var sequelize = new Sequelize("monopoly_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


// Exports the connection for other files to use
module.exports = sequelize;
