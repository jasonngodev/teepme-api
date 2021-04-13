'use strict';

var locationModel = require('../Models/LocationModel');

exports.getData = function(req, res) {
  locationModel.getData(function(err, location) {
    console.log('controller location')
    if (err){
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
    }
    else{
      res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  location});
    }
  });
};


