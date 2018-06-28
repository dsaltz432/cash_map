// importing sqlite and creating the database
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");


module.exports = {
  login: function (username, password, req, res) {

  	console.log("Log In attempt..." + username + ", " + password);

	if (!username && !password){ res.send("Enter the required fields");}
	else if (!username){res.send("Enter your username");}
	else if (!password){res.send("Enter your password");}
	else {
		db.all("SELECT * FROM users WHERE username = ?" +
		" AND password = ?", [username,password], function(err,row){
			if (row.length < 1){ // checks for empty list
				res.send("Invalid credentials!");	
			} else {
				res.send("Logged in successfully!");
			}
		});
	}

  }
};