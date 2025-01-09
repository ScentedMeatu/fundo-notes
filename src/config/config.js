require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  }
};
