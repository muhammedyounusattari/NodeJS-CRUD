var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql@5039",
    database: "sys"
});



module.exports.con = con;
