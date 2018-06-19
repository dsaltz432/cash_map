var locations = require('mastercard-locations');

module.exports = {
  testAPI: function () {

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
  }
};

