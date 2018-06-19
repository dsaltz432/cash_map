var locations = require('mastercard-locations');
var MasterCardAPI = locations.MasterCardAPI;

var consumerKey = "your consumer key";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
var keyStorePath = "path to your .p12 private key file"; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
var keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
var keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key

// You only need to do initialize MasterCardAPI once
// For production use pass sandbox: false
var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
MasterCardAPI.init({
    sandbox: true,
    authentication: authentication
});

var requestData = {
  "Country": "USA"
};

locations.ATMCountrySubdivisions.query(requestData
, function (error, data) {
    if (error) {
        console.error("An error occurred");
        console.error(error);
    }
    else {
        console.log(data.CountrySubdivisions.CountrySubdivision[0].Name);     //Output-->ARMED FORCES AMERICAS
        console.log(data.CountrySubdivisions.CountrySubdivision[0].Code);     //Output-->AA
        console.log(data.CountrySubdivisions.CountrySubdivision[1].Name);     //Output-->ARMED FORCES CAN AFRICA E
        console.log(data.CountrySubdivisions.CountrySubdivision[1].Code);     //Output-->AE
        console.log(data.CountrySubdivisions.CountrySubdivision[2].Name);     //Output-->ALASKA
        console.log(data.CountrySubdivisions.CountrySubdivision[2].Code);     //Output-->AK
        
    }
});

