var locations = require('mastercard-locations');
var MasterCardAPI = locations.MasterCardAPI;

module.exports = {
  auth: function (consumerKey, keyStorePath, keyAlias, keyPassword) {

	// You only need to do initialize MasterCardAPI once
	// For production use pass sandbox: false
	var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
	MasterCardAPI.init({
	    sandbox: true,
	    authentication: authentication
	});

  }
};