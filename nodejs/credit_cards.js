var allCreditCards = {
				"AMERICAN_EXPRESS": {
					"restaurant": 3, "health": 2, "pharmacy: ": 1, "gym: ": 1
				}, 
				"CHASE_FREEDOM": {
					"restaurant": 1, "health": 5, "pharmacy: ": 1, "gym: ": 2
				}
			};

var allCreditCardsQ3 = {
	"DISCOVER_IT_CASH_BACK": {
		"restaurant": 5, "default": 1
	}, 
	"CHASE_FREEDOM": {
		//pharmacy => only walgreens..
		"gas_station": 5, "pharmacy": 5, "default": 1
	},
	"CHASE_SAPPHIRE_PRESERVE": {
		
	},
	"BANK_OF_AMERICA_CASH_REWARDS": {
		//department_store: need to get to wholesale...
		"gas_station": 3, "supermarket": 2, "department_store": 2, "default": 1
	},
	"CITI_DOUBLE_CASH_CARD": {
		"default": 2
	},
	"BARCLAY_UBER_VISA_CARD": {
		"restaurant": 4, "lodging": 3, "default": 1
	},
	"US_BANK_CASH_PLUS": {
		//list of all.. user preference saves exact choices
		"clothing_store": 5, "electronics_store": 5, "car_rental": 5, "gym": 5, "furniture_store": 5, "movie_theater": 5, "department_store": 5, "gas_station": 2, "restaurant": 2, "supermarket": 2, "default": 1
	},
	"AMERICAN_EXPRESS_BLUE_CASH_PREFERRED": {
		"supermarket": 6, "gas_station": 3, "department_store": 3, "default": 1
	}
};

module.exports = {
	getCreditCards: function() {
		return allCreditCards;
	},

	getCurrentCreditCards: function() {
		return allCreditCardsQ3;
	},

	getCashBack: function(places) {
		console.log("Getting Cash Back");
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

		console.log("Found " + places.length + " results");
		return places;
	}

};