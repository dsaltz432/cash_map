let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

// import custom js files
let login = require('./login.js');
let signup = require('./signup.js');
let google_api = require('./google_api.js');
let credit_cards = require('./credit_cards.js');

// import sqlite and create the database
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db");

// import logger
const log4js = require('log4js');
log4js.configure("../config/log4js.json");
const log = log4js.getLogger('test');

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
		let username = req.query.username;
		let password = req.query.password;
		login.login(username, password, req, res);
	});

	// "Sign Up" clicks
	app.post('/signup', function (req, res) {
		let postBody = req.body;
		let username = postBody.username;
		let password = postBody.password;
		signup.signup(username, password, req, res);
	});


	// // Test MasterCard API
	// app.get('/testMasterCardAPI', function (req, res) {
	// 	console.log("Trying to test MasterCard API...");

	// 	let directory = "../../../../../../Documents/secret_keys/";
	// 	let file_name = "key_info.txt";

	//   	let contents = fs.readFileSync(directory + file_name, 'utf8');
	//   	let arr = contents.split("\n");

	//   	// 1st: Consumer Key, 2nd: keyAlias, 3rd: keyPassword
	// 	let consumerKey = arr[0].split(":")[1];
	// 	let keyAlias = arr[1].split(":")[1];
	// 	let keyPassword = arr[2].split(":")[1];
	// 	let keyStorePath = directory + "cashmap_sandbox_key.p12";


	// 	authenticate.auth(consumerKey, keyStorePath, keyAlias, keyPassword);
	// 	atm_locations.testAPI();
	// 	merchants_category.testAPI();

	// });

	app.get('/googleApiTest', function (req, res) {
		console.log("Trying to call Google Test");

		res.send(google_api.geoCodeTest());
	});

	app.get('/mapsSearchNearby', function (req, res) {
		console.log("Google Maps Search Nearby", req.query.lng, req.query.lat, req.query.radius);
		google_api.searchNearby(req.query).then((response) => {
  			console.log(response);
  			for(let i = 0; i < response.json.results.length; i++){
  				console.log(response.json.results[i]);
  			}
  			let places = credit_cards.getCashBack(response.json.results);

  			res.send(places);
	  	})
	  	.catch((err) => {
	  		log.info("SEARCH NEARBY ERROR");
	  		return "SEARCH NEARBY ERROR";
	  	});
		
	});
});


/* starting web server */
let server = app.listen(3000, function () {
  	let port = server.address().port;
  	console.log('Server started at http://localhost:%s/', port);
});