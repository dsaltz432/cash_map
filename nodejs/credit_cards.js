// import logger
const log4js = require('log4js');
log4js.configure("../config/log4js.json");
const log = log4js.getLogger('test');

let allCreditCards = {
				"AMERICAN_EXPRESS": {
					"restaurant": 3, "health": 2, "pharmacy: ": 1, "gym: ": 1
				}, 
				"CHASE_FREEDOM": {
					"restaurant": 1, "health": 5, "pharmacy: ": 1, "gym: ": 2
				}
			};

module.exports = {
	getCreditCards: function() {
		return allCreditCards;
	},

	getCashBack: function(places) {
		for(let i = 0; i < places.length; i++){
			places[i].cash_back = null;
			places[i].recommended_card = "";
			for(let j = 0; j < places[i].types.length; j++){
				if(allCreditCards["AMERICAN_EXPRESS"][places[i].types[j]] || allCreditCards["CHASE_FREEDOM"][places[i].types[j]]){
					if(allCreditCards["AMERICAN_EXPRESS"][places[i].types[j]] > allCreditCards["CHASE_FREEDOM"][places[i].types[j]]){
						places[i].cash_back = allCreditCards["AMERICAN_EXPRESS"][places[i].types[j]];
						places[i].recommended_card = "AMERICAN_EXPRESS";
					}
					else{
						places[i].cash_back = allCreditCards["CHASE_FREEDOM"][places[i].types[j]];
						places[i].recommended_card = "CHASE_FREEDOM";
					}
				}
			}
		}

		log.info("Found " + places.length + " results");
		return places;
	}

};