// importing sqlite and creating the database
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");

// import logger
const log4js = require('log4js');
log4js.configure("../config/log4js.json");
const log = log4js.getLogger('test');

var encryption = require('./encryption.js');
var bcrypt = require('bcryptjs');

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

		encryption.getPassword(username).then((response) => {
				
		var ePassword = response.rows[0]['password'];
		log.info(ePassword);

		let query = "SELECT * FROM users WHERE username = ?";
		log.info(query);

		db.all(query, [username], function(err,row){
			if (row.length < 1){ // checks for empty list
				error = "Invalid credentials!";
			 } else if (!bcrypt.compareSync(password, ePassword)) {
			 	error = "Invalid password!";
			} else {
				error = null;
			}
			json.error = error;
			log.info("error: " + error);
			res.send(error);	
			});
	  	})
	  	.catch((err) => {
		  	json.error = err.error;
		  	log.info(json);
		  	res.send(json);
	  	});
	}
  }
};