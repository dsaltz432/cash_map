// import logger
const log4js = require('log4js');
log4js.configure({
  appenders: { 'file': { type: 'file', filename: '../logs/cash_map.log' } },
  categories: { default: { appenders: ['file'], level: 'info' } }
});
const log = log4js.getLogger('test');


let googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCO--tJQS15jNWB5vQ5peU_OaUCOteSQ8c',
  Promise: Promise
});


module.exports = {
	// geoCodeTest: function () {
 //  	// Geocode an address.
 //    googleMapsClient.geocode({
 //        address: '1600 Amphitheatre Parkway, Mountain View, CA'
 //    }, function(err, response) {
 //        if (!err) {
 //          log.info(response.json.results);
 //          return response.json.results;
 //        }
 //        else{
 //          log.info('ERROR: ', err);
 //          return "ERROR";
 //        }
 //    });
 //  },
	// searchNearbyMultipleTypes: function({location, radius, typesArray}) {
	// 	console.log(`multiple types search: ${location} | ${radius} | ${typesArray}`)
	// 	return Promise.all(typesArray.map(type => this.searchNearby({location, radius, type})))
	// },
	searchNearby: function ({location, radius, type}) {
    log.info("searchNearby: ", "Location: ", location, "Radius: ", radius, "Filter: ", type);
		log.info(`Searching Nearby: ${location} | ${radius} | ${type}`);
		return googleMapsClient.placesNearby({location, radius, type}).asPromise();
	},
	queryPlaces: function ({location, radius, query}) {
		log.info("Querying Places: ");

		return googleMapsClient.places({location, radius, query}).asPromise().then(response => {
      log.info(`Search Places by Text: ${location} | ${radius} | ${query}`);
			log.info(response.json);
			return response.json;
		})
			.catch(err => {
				console.log(err);
				return "ERROR";
			});
	}
};