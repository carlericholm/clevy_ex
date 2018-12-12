var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root42"
});

con.connect((err) => {
	if (err) throw err;
	con.query("CREATE DATABASE IF NOT EXISTS clevy", (err) => { if (err) throw err; });
	con.query('USE `clevy`', (err) => { if (err) throw err; });

	var sql = "CREATE TABLE IF NOT EXISTS logs (id INT PRIMARY KEY AUTO_INCREMENT, question VARCHAR(255), answer VARCHAR(255))";
	con.query(sql, (err) => { if (err) throw err;});
  
});

module.exports = con;