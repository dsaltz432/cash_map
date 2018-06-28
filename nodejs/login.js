// importing sqlite and creating the database
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");

// import logger
const log4js = require('log4js');
log4js.configure("../config/log4js.json");
const log = log4js.getLogger('test');

module.exports = {
  login: function (username, password, req, res) {

  	log.info("Log In attempt, username: " + username + ", password: " + password);
	let response = "";

	if (!username && !password){ 
		response = "Enter the required fields";
		log.info(response);
		res.send(response);
	}
	else if (!username){
		response = "Enter your username";
		log.info(response);
		res.send(response);	
	}
	else if (!password){
		response = "Enter your password";
		log.info(response);
		res.send(response);	
	}
	else {
		let query = "SELECT * FROM users WHERE username = ? AND password = ?";
		log.info(query);

		db.all(query, [username,password], function(err,row){
			if (row.length < 1){ // checks for empty list
				response = "Invalid credentials!";
			} else {
				response = "Logged in successfully!";
			}
			log.info(response);
			res.send(response);	
		});
	}
  }
};