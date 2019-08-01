const mysql = require('mysql');
const config = require('../config');

let connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});
connection.connect(function(err) {
    if (err)throw err;
    console.log("Connected! Jupi jej!");
});

module.exports = connection;