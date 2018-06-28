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
	let error = "";
	let json = {};

	if (!username && !password){ 
		error = "Enter the required fields";
			log.info("error: " + error);
		json.error = error;
		res.send(json);
	}
	else if (!username){
		response = "Enter your username";
			log.info("error: " + error);
		json.error = error;
		res.send(json);
	}
	else if (!password){
		response = "Enter your password";
			log.info("error: " + error);
		json.error = error;
		res.send(json);
	}
	else {
		let query = "SELECT * FROM users WHERE username = ? AND password = ?";
		log.info(query);

		db.all(query, [username,password], function(err,row){
			if (row.length < 1){ // checks for empty list
				error = "Invalid credentials!";
			} else {
				error = null;
			}
			json.error = error;
			log.info("error: " + error);
			res.send(response);	
		});
	}
  }
};