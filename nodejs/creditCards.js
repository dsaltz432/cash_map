var allCreditCards = {
				"AMERICAN_EXPRESS": {
					"restaurant": 3, "health": 2, "pharmacy: ": 1
				}, 
				"CHASE_FREEDOM": {
					"restaurant": 1, "health": 5, "pharmacy: ": 1
				}
			};

module.exports = {
	getCreditCards: function() {
		return allCreditCards;
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

		return places;
	}

};