const mysql = require('mysql');
// const config = require('../config');

let connection = mysql.createPool({
    connectionLimit: 10,
    // host: config.database.host,
    // user: config.database.user,
    // password: config.database.password,
    // database: config.database.database
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
});

module.exports = connection;
