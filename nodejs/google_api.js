// import logger
const log4js = require('log4js');
log4js.configure("../config/log4js.json");
const log = log4js.getLogger('test');


let googleMapsClient = require('@google/maps').createClient({
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
	    	log.info(response.json.results);
	    	return response.json.results;
	  	}
	  	else{
        log.info('ERROR: ', err);
	  		return "ERROR";
	  	}
	});

  },
  searchNearby: function(params) {
  	log.info("searchNearby: ", "Latitude: ", params.lat, "Longitude: ", params.lng, "Filter: ", params.filter);
  	let query = {};
  	query.location = [params.lat, params.lng];
  	query.radius = +params.radius;

  	if (params.filter) {
  		query.keyword = params.filter;
  	}

    log.info("query: ", query);
  	return googleMapsClient.placesNearby(query).asPromise();
  }
};