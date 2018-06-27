var locations = require('mastercard-locations');

module.exports = {
  testAPI: function () {

    var requestData = {
      "PageLength": "5",
      "PostalCode": "11101",
      "PageOffset": "0"
    };

    locations.ATMLocations.query(requestData
    , function (error, data) {
        if (error) {
            console.error("An error occurred");
            console.error(error);
        }
        else {
            console.log(data.Atms.PageOffset);     //Output-->0
            console.log(data.Atms.TotalCount);     //Output-->26
            console.log(data.Atms.Atm[0].Location.Name);     //Output-->Sandbox ATM Location 1
            console.log(data.Atms.Atm[0].Location.Distance);     //Output-->0.9320591049747101
            console.log(data.Atms.Atm[0].Location.DistanceUnit);     //Output-->MILE
            console.log(data.Atms.Atm[0].Location.Address.Line1);     //Output-->4201 Leverton Cove Road
            console.log(data.Atms.Atm[0].Location.Address.City);     //Output-->SPRINGFIELD
            console.log(data.Atms.Atm[0].Location.Address.PostalCode);     //Output-->11101
            console.log(data.Atms.Atm[0].Location.Address.CountrySubdivision.Name);     //Output-->UYQQQQ
            console.log(data.Atms.Atm[0].Location.Address.CountrySubdivision.Code);     //Output-->QQ
            console.log(data.Atms.Atm[0].Location.Address.Country.Name);     //Output-->UYQQQRR
            console.log(data.Atms.Atm[0].Location.Address.Country.Code);     //Output-->UYQ
            console.log(data.Atms.Atm[0].Location.Point.Latitude);     //Output-->38.76006576913497
            console.log(data.Atms.Atm[0].Location.Point.Longitude);     //Output-->-90.74615107952418
            console.log(data.Atms.Atm[0].Location.LocationType.Type);     //Output-->OTHER
            console.log(data.Atms.Atm[0].HandicapAccessible);     //Output-->NO
            console.log(data.Atms.Atm[0].Camera);     //Output-->NO
            console.log(data.Atms.Atm[0].Availability);     //Output-->UNKNOWN
            console.log(data.Atms.Atm[0].AccessFees);     //Output-->UNKNOWN
            console.log(data.Atms.Atm[0].Owner);     //Output-->Sandbox ATM 1
            console.log(data.Atms.Atm[0].SharedDeposit);     //Output-->NO
            console.log(data.Atms.Atm[0].SurchargeFreeAlliance);     //Output-->NO
            console.log(data.Atms.Atm[0].SurchargeFreeAllianceNetwork);     //Output-->DOES_NOT_PARTICIPATE_IN_SFA
            console.log(data.Atms.Atm[0].Sponsor);     //Output-->Sandbox
            console.log(data.Atms.Atm[0].SupportEMV);     //Output-->1
            console.log(data.Atms.Atm[0].InternationalMaestroAccepted);     //Output-->1
        }
    });
  }
};


