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
log4js.configure({
  appenders: { 'file': { type: 'file', filename: '../logs/cash_map.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
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
	Handling REST API Requests
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

	// "Remove Card" clicks
	app.delete('/removeCard', function (req, res) {
		let postBody = req.body;
		let username = postBody.username;
		let card = postBody.card;
		credit_cards.removeCard(username, card, req, res);
	});

	// "Remove Card" clicks
	app.get('/getCards', function (req, res) {
		let username = req.query.username;

		let json = {};
		json.username = username;
		let error = null;
		let cardsArr = [];
		json.cards = cardsArr;
		json.error = error;

		credit_cards.getCards(username).then((response) => {
			for (let i = 0; i < response.rows.length; i++){
				cardsArr[i] = response.rows[i]['card'];
			}

			if (cardsArr.length == 0){
				error = "No cards for that user";
				json.error = error;
			}

		  	log.info(json);
		  	res.send(json);

	  	})
	  	.catch((err) => {
	  		json.error = err.error;
	  		log.info(json);
	  		res.send(json);
	  	});
	});

	app.get('/mapsSearchNearby', function (req, res) {
		console.log("Google Maps Search Nearby", req.query);
		if (req.query.pagetoken) {
			delete req.query.location;
		}
		req.query.radius = +req.query.radius;
		google_api.searchNearby(req.query)
			.then(results => {
				console.log(results.json);
				res.send(results.json);
		})
			.catch(err => {
				console.error(err);
				throw new Error(err);
			});
	});

	// // Test MasterCard API
	// app.get('/testMasterCardAPI', function (req, res) {
	// 	console.log("Trying to test MasterCard API...");


	// 	var directory = "../../../../../../Documents/secret_keys/";
	// 	var file_name = "key_info.txt";

	//   	var contents = fs.readFileSync(directory + file_name, 'utf8');
	//   	var arr = contents.split("\n");

	//   	// 1st: Consumer Key, 2nd: keyAlias, 3rd: keyPassword
	// 	var consumerKey = arr[0].split(":")[1];
	// 	var keyAlias = arr[1].split(":")[1];
	// 	var keyPassword = arr[2].split(":")[1];
	// 	var keyStorePath = directory + "cashmap_sandbox_key.p12";

	// 	authenticate.auth(consumerKey, keyStorePath, keyAlias, keyPassword);
	// 	atm_locations.testAPI();
	// 	merchants_category.testAPI();

	// });

	// app.get('/googleApiTest', function (req, res) {
	// 	console.log("Trying to call Google Test");

	// 	res.send(google_api.geoCodeTest());
	// });

	// app.get('/mapsSearchByCC', function(req, res) {
	// 	console.log("Google Maps Search by Credit Card");
	// 	console.log(req.query);

	// 	const { location, radius, ccList } = req.query;
	// 	// // uncomment below (and comment the line above) to test hardcoded query 
	// 	// const ccList = ['DISCOVER_IT_CASH_BACK'];
	// 	// const location = '37.33025622,-122.02763446';
	// 	// const radius = 388.96666666666664;

	// 	const typesArray = creditCards.getUniqueTypesFromCards(ccList);

	// 	google_api.searchNearbyMultipleTypes({location, radius, typesArray})
	// 		.then(results => res.send(results))
	// 		.catch(err => {throw new Error(err)});
	// });

	// app.get('/mapsSearchbyType', function(req, res) {
	// 	console.log("Google Maps Search by Type");
	// });


	app.get('/mapsQueryPlaces', function (req, res) {
		req.query.radius = +req.query.radius;
		google_api.queryPlaces(req.query).then( result => {
			res.send(result);
		})
		.catch(log.info);
	});

	// app.get('/getAllCC', function (req, res) {
	// 	res.send(credit_cards.getCurrentCreditCards());
	// });


});


/* starting web server */
let server = app.listen(3000, function () {
  	let port = server.address().port;
  	console.log('Server started at http://localhost:%s/', port);
});