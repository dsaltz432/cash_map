var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

// import my own js files
var login = require('./login.js');
var atm_locations = require('./atm_locations');
var merchants_category = require('./example_merchants_category');
var authenticate = require('./authenticate');

// importing sqlite and creating the database
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");


db.serialize(function() {

/***********************************************
		Creating tables in users.db database
************************************************/

	// creates a table in the database if it doesn't already exist
	db.run("CREATE TABLE if not exists users "+
		"(username TEXT NOT NULL,password TEXT NOT NULL,PRIMARY KEY (username))");

/***********************************************
	Handling requests from index.html
************************************************/

	// "Log In" clicks
	app.get('/login', function (req, res) {
		var username = req.query.username;
		var password = req.query.password;
		login.login(username, password, req, res);
	});

	// "Sign Up" clicks
	app.post('/signup', function (req, res) {
		var postBody = req.body;
		var myUsername = postBody.username;
		var myPassword = postBody.password;

		console.log("Sign Up attempt..." + myUsername + ", " + myPassword);

		if (!myUsername && !myPassword){ res.send("Enter the required fields");}
		else if (!myUsername){ res.send("Enter your username");}
		else if (!myPassword){ res.send("Enter your password");}
		else {
			if (myPassword.length < 7){
				res.send("Your password must be longer than 7 characters");
			} else {	
				// first check if that username exists in the table already
				db.all("SELECT * FROM users WHERE username = ?", [myUsername], function(err,row){
					if (row.length < 1){ // checks for empty list
						db.run("INSERT INTO users VALUES (?,?)",[myUsername,myPassword], function(err, row) {
							if (err != null){ res.send("Failed to create new account");}
							else { res.send("Created a new account!");}
						});	
					} else {
						res.send("That username is already taken!");
					}
				});
			}
		}
	});

	// Delete all users
	app.post('/delete', function (req, res) {
		console.log("Trying to delete all users");

		db.run("DELETE FROM users", function(err, row) {
			if (err != null){ res.send("Failed to delete all users"); }
			else { res.send("All users deleted!"); }
		});	
	});

	// Test MasterCard API
	app.get('/testMasterCardAPI', function (req, res) {
		console.log("Trying to test MasterCard API...");

		var directory = "../../../../../../Documents/secret_keys/";
		var file_name = "key_info.txt";

	  	var contents = fs.readFileSync(directory + file_name, 'utf8');
	  	var arr = contents.split("\n");

	  	// 1st: Consumer Key, 2nd: keyAlias, 3rd: keyPassword
		var consumerKey = arr[0].split(":")[1];
		var keyAlias = arr[1].split(":")[1];
		var keyPassword = arr[2].split(":")[1];
		var keyStorePath = directory + "cashmap_sandbox_key.p12";


		authenticate.auth(consumerKey, keyStorePath, keyAlias, keyPassword);
		atm_locations.testAPI();
		merchants_category.testAPI();

	});

});


/* starting web server */
var server = app.listen(3000, function () {
  	var port = server.address().port;
  	console.log('Server started at http://localhost:%s/', port);
});