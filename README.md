# clevy_ex

Simple chatbot exercice

# Set up

Node version: 8.12.0
Make sure mysql is installed, go to to config directory, change following lines in database.js: 

var con = mysql.createConnection({
	host: "YOUR HOST",
	user: "YOUR USERNAME",
	password: "YOUR PASSWORD"
});


CLI > npm install

CLI > node index.js [STRING PASSED AS ARGUMENT]
