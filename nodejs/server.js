var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

// import my own js files
var login = require('./login.js');
var atm_locations = require('./mastercard/atm_locations');
var merchants_category = require('./mastercard/example_merchants_category');
var authenticate = require('./mastercard/authenticate');
var googleApi = require('./google_api.js');
var creditCards = require('./credit_cards.js');

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

	app.get('/googleApiTest', function (req, res) {
		console.log("Trying to call Google Test");

		res.send(googleApi.geoCodeTest());
	});

	app.get('/mapsSearchByCC', function(req, res) {
		console.log("Google Maps Search by Credit Card");
		//get return types from credit card inputs
		let ccList = ["DISCOVER_IT_CASH_BACK", "AMERICAN_EXPRESS_BLUE_CASH_PREFERRED","BANK_OF_AMERICA_CASH_REWARDS"];
		res.send(creditCards.getTypesFromCards(ccList));

		//run search on google maps
		
	});

	app.get('/mapsSearchbyType', function(req, res) {
		console.log("Google Maps Search by Type");
	});

	app.get('/mapsSearchNearby', function (req, res) {
		console.log("Google Maps Search Nearby", req.query.lng, req.query.lat, req.query.radius);
		googleApi.searchNearby(req.query).then((response) => {
  			console.log(response);

  			let allResults = [];
  			allResults = allResults.concat(response.json.results);

  			//req.query.pagetoken = response.json.next_page_token;
  			
  			//while(response.json.next_page_token){
  				// for(let i = 0; i < response.json.results.length; i++){
  				// 	console.log(response.json.results[i]);
  				// }
  				// googleApi.searchNearby(req.query).then(response => {
  				// 	console.log("RESPONSE 2");
  				// 	console.log(response);
  				// 	for(let i = 0; i < response.json.results.length; i++){
	  			// 		console.log(response.json.results[i]);
	  			// 	}
  				// 	allResults.concat(response.json.results);
  				// 	req.query.pagetoken = response.json.next_page_token;
  				// })
  				// .catch(err => {
  				// 	console.log("SEARCH NEARBY 2 ERROR");
  				// 	console.log(err);
  				// 	return "Error";
  				// });
  			//}

  			//let places = creditCards.getCashBack(creditCards.getCashBack(allResults));

  			console.log(allResults);

  			res.send(allResults);
  			return allResults;
	  	})
	  	.catch((err) => {
	  		console.log("SEARCH NEARBY ERROR");
	  		console.log(err);
	  		return "Error";
	  	});
		
	});

	app.get('/mapsQueryPlaces', function (req, res) {
		res.send(googleApi.queryPlaces(req.query));
	});

	app.get('/getAllCC', function (req, res) {
		res.send(creditCards.getCurrentCreditCards());
	});


});


/* starting web server */
var server = app.listen(3000, function () {
  	var port = server.address().port;
  	console.log('Server started at http://localhost:%s/', port);
});