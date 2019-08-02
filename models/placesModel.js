const mysql = require('mysql');

let connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
});
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected! Jupi jej!");
// });

module.exports = connection;