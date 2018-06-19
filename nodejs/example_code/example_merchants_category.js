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

var requestData = {};

locations.MerchantCategories.query(requestData
, function (error, data) {
    if (error) {
        console.error("An error occurred");
        console.error(error);
    }
    else {
        console.log(data.Categories.Category[0]);     //Output-->1Apparel
        console.log(data.Categories.Category[1]);     //Output-->2Automotive
        console.log(data.Categories.Category[2]);     //Output-->3Beauty
        console.log(data.Categories.Category[3]);     //Output-->4Book Stores
        console.log(data.Categories.Category[4]);     //Output-->5Convenience Stores
        console.log(data.Categories.Category[5]);     //Output-->7Dry Cleaners And Laundry Services
        console.log(data.Categories.Category[6]);     //Output-->8Fast Food Restaurants
        console.log(data.Categories.Category[7]);     //Output-->9Gift Shops, Hobbies, Jewelers
        console.log(data.Categories.Category[8]);     //Output-->10Grocery Stores And Supermarkets
        console.log(data.Categories.Category[9]);     //Output-->11Health
        
    }
});

