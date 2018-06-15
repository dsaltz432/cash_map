/*
Send To:

zzoutop@gmail.com
valentine.216@osu.edu

*/


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('static_files'));

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
	app.get('/users/*', function (req, res) {
		var myUsername = req.query.username;
		var myPassword = req.query.password;
		if (!myUsername && !myPassword){ res.send("Enter the required fields");}
		else if (!myUsername){res.send("Enter your username");}
		else if (!myPassword){res.send("Enter your password");}
		else {
			db.all("SELECT * FROM users WHERE username = ?" +
			" AND password = ?", [myUsername,myPassword], function(err,row){
				if (row.length < 1){ // checks for empty list
					res.send("Invalid information, "+
					 "or you have not yet created an account. To create a "+ 
					 "new account, enter a username and password, "+
					 "and click Create New Account.");	
				} else {
					res.send("Logged in successfully!");
				}
			});
		}
	});

	// "Sign Up" clicks
	app.post('/users', function (req, res) {

		console.log(req.body);
		console.log(res.body);

		var postBody = req.body;
		var myUsername = postBody.username;
		var myPassword = postBody.password;

		if (!myUsername && !myPassword){ res.send("Enter the required fields");}
		else if (!myUsername){ res.send("Enter your username");}
		else if (!myPassword){ res.send("Enter your password");}
		else {
			if (myPassword.length < 7){
				res.send("Your password must be longer than 7 characters");
			} else {	
				db.run("INSERT INTO users VALUES (?,?)",[myUsername,myPassword], function(err, row) {
					if (err != null){ res.send("Failed to create new account");}
					else { res.send("Created a new account!");}
				});	
			}
		}
	});

	// Delete all users
	app.post('/delete', function (req, res) {
		db.run("DELETE FROM users", function(err, row) {
			if (err != null){ res.send("Failed to delete all users"); }
			else { res.send("All users deleted!"); }
		});	
	});

});


/* starting web server */
var server = app.listen(3000, function () {
  	var port = server.address().port;
  	console.log('Server started at http://localhost:%s/', port);
});