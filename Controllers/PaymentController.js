'use strict';

var paymentyModel = require('../Models/PaymentModel');

exports.getData = function(req, res) {
  paymentyModel.getData(function(err, currency) {
    if (err){
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
    }
    else{
      res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  currency});
    }
  });
};


