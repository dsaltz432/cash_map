// importing sqlite and creating the database
var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyCO--tJQS15jNWB5vQ5peU_OaUCOteSQ8c',
	Promise: Promise
});


module.exports = {
	geoCodeTest: function () {
		// Geocode an address.
		googleMapsClient.geocode({
			address: '1600 Amphitheatre Parkway, Mountain View, CA'
		}, function (err, response) {
			if (!err) {
				console.log(response.json.results);
				return response.json.results;
			}
			else {
				console.log("ERROR");
				return "ERROR";
			}
		});
	},
	searchNearbyMultipleTypes: function({location, radius, typesArray}) {
		console.log(`multiple types search: ${location} | ${radius} | ${typesArray}`)
		return Promise.all(typesArray.map(type => this.searchNearby({location, radius, type})))
	},
	searchNearby: function ({location, radius, type}) {
		console.log(`Searching Nearby: ${location} | ${radius} | ${type}`);
		return googleMapsClient.placesNearby({location, radius, type}).asPromise();
	},
	queryPlaces: function (params) {
		console.log("Querying Places: ");

		let query = {};
		query.query = params.filter;
		query.location = [params.lat, params.lng];
		query.radius = +params.radius;

		return googleMapsClient.places(query).asPromise().then(response => {
			console.log(response.json.results);
			return response.json.results;
		})
			.catch(err => {
				console.log(err);
				return "ERROR";
			});
	}
};