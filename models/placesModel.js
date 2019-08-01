const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
});
connection.connect(function(err) {
    if (err)throw err;
    console.log("Connected! Jupi jej!");
});

module.exports = connection;