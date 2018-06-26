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
	}, function(err, response) {
	  	if (!err) {
	    	console.log(response.json.results);
	    	return response.json.results;
	  	}
	  	else{
	  		console.log("ERROR");
	  		return "ERROR";
	  	}
	});

  },
  searchNearby: function(params) {
  	console.log("Searching Nearby: ", "Latitude: ", params.lat, "Longitude: ", params.lng, "Filter: ", params.filter);
  	let query = {};
  	query.location = [params.lat, params.lng];
  	query.radius = +params.radius;

  	if(params.filter) {
  		query.keyword = params.filter;
  	}

  	return googleMapsClient.placesNearby(query).asPromise();
  }
};