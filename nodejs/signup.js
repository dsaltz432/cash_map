// importing sqlite and creating the database
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");

// import logger
const log4js = require('log4js');
log4js.configure({
  appenders: { 'file': { type: 'file', filename: '../logs/cash_map.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const log = log4js.getLogger('test');


var encryption = require('./encryption.js');

module.exports = {
  signup: function (username, password, req, res) {

  	log.info("Sign Up attempt, username: " + username + ", password: " + password);
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
		if (password.length < 7){
			response = "Your password must be longer than 7 characters";
			log.info(response);
			res.send(response);
		} else {	
			// first check if that username exists in the table already
			let query = "SELECT * FROM users WHERE username = ?";
			log.info(query);

			db.all(query, [username], function(err,row){
				if (row.length < 1){ // checks for empty list
					var ePassword = encryption.encryption(password);
					log.info("INSERT INTO users VALUES (?,?) " + username + ", " + ePassword);
					db.run("INSERT INTO users VALUES (?,?)",[username,ePassword], function(err, row) {
						if (err != null){ response = "Failed to create new account";}
						else { response = null;}
						log.info(response);
						res.send(response);
					});	
				} else {
					response = "That username is already taken!";
					log.info(response);
					res.send(response);
				 }
			});
		}
	}
  }
};