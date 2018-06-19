/**
 *
 * Script-Name: example_placeByLocationId
 */

var places = require('mastercard-places');
var MasterCardAPI = places.MasterCardAPI;

var consumerKey = "eu9q12oLekenAkqr8Sd5hx0wXRin_hLwKQfvqu7kc5e232f3!36be70edce754ee19c92a35d850aef000000000000000000";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
var keyStorePath = "/Users/zz/Documents/nodeServer/CashMap-sandbox.p12"; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
var keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
var keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key

// You only need to do initialize MasterCardAPI once
//
var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
MasterCardAPI.init({
	sandbox: true,
	debug: true,
	authentication: authentication
});


var requestData = {
  "locationId": "300945305"
};
places.PlaceByLocationId.query(requestData
, function (error, data) {
	if (error) {
		err("HttpStatus: "+error.getHttpStatus());
		err("Message: "+error.getMessage());
		err("ReasonCode: "+error.getReasonCode());
		err("Source: "+error.getSource());
		err(error);

	}
	else {
		out(data.place.merchantName); //-->FAMOUSFOOTWEAR#1749
		out(data.place.streetAddr); //-->2254 HWY K
		out(data.place.cityName); //-->O FALLON
		out(data.place.stateProvidenceCode); //-->MO
		out(data.place.postalCode); //-->63368
		out(data.place.countryCode); //-->USA
		out(data.place.telephoneNumber); //-->
		out(data.place.mccCode); //-->5661
		out(data.place.legalCorporateName); //-->BROWN SHOE COMPANY INC
		out(data.place.industry); //-->SHS
		out(data.place.superIndustry); //-->AAP
		out(data.place.dateEstablished); //-->10/23/1999
		out(data.place.newBusinessFlag); //-->FALSE
		out(data.place.inBusiness7DayFlag); //-->TRUE
		out(data.place.inBusiness30DayFlag); //-->TRUE
		out(data.place.inBusiness60DayFlag); //-->TRUE
		out(data.place.inBusiness90DayFlag); //-->TRUE
		out(data.place.inBusiness180DayFlag); //-->TRUE
		out(data.place.inBusiness360DayFlag); //-->TRUE
		out(data.place.latitude); //-->38.778083
		out(data.place.longitude); //-->-90.699706
		out(data.place.geocodeQualityIndicator); //-->STOREFRONT
		out(data.place.primaryChannelOfDistribution); //-->B
		out(data.place.cashBack); //-->FALSE
		out(data.place.payAtThePump); //-->FALSE
		out(data.place.nfcFlag); //-->TRUE
		out(data.place.aggregateMerchantId); //-->12077
		out(data.place.aggregateMerchantName); //-->FAMOUS FOOTWEAR
		out(data.place.keyAggregateMerchantId); //-->12077
		out(data.place.parentAggregateMerchantId); //-->10000344
		out(data.place.parentAggregateMerchantName); //-->CALERES / BROWN SHOE COMPANY INC
		out(data.place.msaCode); //-->7040
		out(data.place.naicsCode); //-->448210
		out(data.place.dmaCode); //-->609
		out(data.place.locationId); //-->300945305
	}
});


function out(value) {
	console.log(value);
}

function outObj(item, key) {
	console.log(item[key]);
}

function err(value) {
	console.error(value);
}