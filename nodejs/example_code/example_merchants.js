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
  "Details": "acceptance.paypass",
  "PageLength": "5",
  "Latitude": "38.53463",
  "Longitude": "-90.286781",
  "PageOffset": "0"
};

locations.MerchantLocations.query(requestData
, function (error, data) {
    if (error) {
        console.error("An error occurred");
        console.error(error);
    }
    else {
        console.log(data.Merchants.PageOffset);     //Output-->0
        console.log(data.Merchants.TotalCount);     //Output-->3
        console.log(data.Merchants.Merchant[0].Id);     //Output-->36564
        console.log(data.Merchants.Merchant[0].Name);     //Output-->Merchant 36564
        console.log(data.Merchants.Merchant[0].Category);     //Output-->7 - Dry Cleaners And Laundry Services
        console.log(data.Merchants.Merchant[0].Location.Name);     //Output-->Merchant 36564
        console.log(data.Merchants.Merchant[0].Location.Distance);     //Output-->0.9320591049747101
        console.log(data.Merchants.Merchant[0].Location.DistanceUnit);     //Output-->MILE
        console.log(data.Merchants.Merchant[0].Location.Address.Line1);     //Output-->3822 West Fork Street
        console.log(data.Merchants.Merchant[0].Location.Address.City);     //Output-->Great Falls
        console.log(data.Merchants.Merchant[0].Location.Address.PostalCode);     //Output-->51765
        console.log(data.Merchants.Merchant[0].Location.Address.CountrySubdivision.Name);     //Output-->Country Subdivision 517521
        console.log(data.Merchants.Merchant[0].Location.Address.CountrySubdivision.Code);     //Output-->Country Subdivision Code 517521
        console.log(data.Merchants.Merchant[0].Location.Address.Country.Name);     //Output-->Country 5175215
        console.log(data.Merchants.Merchant[0].Location.Address.Country.Code);     //Output-->Country Code 5175215
        console.log(data.Merchants.Merchant[0].Location.Point.Latitude);     //Output-->38.52114017591121
        console.log(data.Merchants.Merchant[0].Location.Point.Longitude);     //Output-->-90.28678100000002
        console.log(data.Merchants.Merchant[0].Acceptance.PayPass.Register);     //Output-->true
        
    }
});

