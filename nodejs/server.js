let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));

// import custom js files
var login = require('./login.js');
let signup = require('./signup.js');
var atm_locations = require('./mastercard/atm_locations');
var merchants_category = require('./mastercard/example_merchants_category');
var authenticate = require('./mastercard/authenticate');
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

	db.run("CREATE TABLE if not exists credit_cards "+
		"(username TEXT NOT NULL,card TEXT NOT NULL,PRIMARY KEY (username,card))");


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


	// "Add Card" clicks
	app.post('/addCard', function (req, res) {
		let postBody = req.body;
		let username = postBody.username;
		let card = postBody.card;
		credit_cards.addCard(username, card, req, res);
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

		res.send(google_api.geoCodeTest());
	});

	app.get('/mapsSearchByCC', function(req, res) {
		console.log("Google Maps Search by Credit Card");
		console.log(req.query);
		//get return types from credit card inputs
		let ccList = ["DISCOVER_IT_CASH_BACK", "AMERICAN_EXPRESS_BLUE_CASH_PREFERRED","BANK_OF_AMERICA_CASH_REWARDS"];
		res.send(credit_cards.getTypesFromCards(ccList));

		const { location, radius, ccList } = req.query;
		// // uncomment below (and comment the line above) to test hardcoded query 
		// const ccList = ['DISCOVER_IT_CASH_BACK'];
		// const location = '37.33025622,-122.02763446';
		// const radius = 388.96666666666664;

		const typesArray = creditCards.getUniqueTypesFromCards(ccList);

		googleApi.searchNearbyMultipleTypes({location, radius, typesArray})
			.then(results => res.send(results))
			.catch(err => {throw new Error(err)});
	});

	app.get('/mapsSearchbyType', function(req, res) {
		console.log("Google Maps Search by Type");
	});

	app.get('/mapsSearchNearby', function (req, res) {
		console.log("Google Maps Search Nearby", req.query);
		if (req.query.pagetoken) {
			delete req.query.location;
		}
		req.query.radius = +req.query.radius;
		googleApi.searchNearby(req.query)
			.then(results => res.send(Object.assign(results, {data: results.json})))
			.catch(err => {
				console.error(err);
				throw new Error(err);
			});
	});

	app.get('/mapsQueryPlaces', function (req, res) {
		res.send(google_api.queryPlaces(req.query));
	});

	app.get('/getAllCC', function (req, res) {
		res.send(credit_cards.getCurrentCreditCards());
	});


});


/* starting web server */
let server = app.listen(3000, function () {
  	let port = server.address().port;
  	console.log('Server started at http://localhost:%s/', port);
});