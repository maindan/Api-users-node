require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DTB_USER,
    "password": process.env.DBT_PASS,
    "database": process.env.DBT_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  },
  "test": {
    "username": process.env.DTB_USER,
    "password": process.env.DBT_PASS,
    "database": process.env.DBT_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  },
  "production": {
    "username": process.env.DTB_USER,
    "password": process.env.DBT_PASS,
    "database": process.env.DBT_NAME,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  }
}
