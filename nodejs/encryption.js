// import logger
const log4js = require('log4js');
log4js.configure("../config/log4js.json");
const log = log4js.getLogger('test');

// importing sqlite and creating the database
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");

//import encryption method
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  encryption: function (password, req, res) {
  	var hash = bcrypt.hashSync(password, salt);
	log.info("Password Encrypted");
	return hash;
  },
	getPassword: function(username) {
	return new Promise(function (resolve, reject) {
	var responseObj;
	let query = "SELECT password FROM users WHERE username = ?";
	log.info(query + " " + username);

	db.all(query,[username], function cb(err, rows) {
	  if (err) {
	    responseObj = {
	      'error': err
	    };
	    reject(responseObj);
	  } else {
	    responseObj = {
	      statement: this,
	      rows: rows
	    };
	    resolve(responseObj);
	    }
	  });
	});
	}
};