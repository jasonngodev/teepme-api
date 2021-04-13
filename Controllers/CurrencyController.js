'use strict';

var currencyModel = require('../Models/CurrencyModel');

exports.getCurrency = function(req, res) {
    currencyModel.getCurrency(function(err, currency) {
    console.log('controller currency')
    if (err){
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
      console.log('res currency', currency);
    }
    else{
      res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  currency});
    }
  });
};

exports.getCurrencyByCode = function(req, res) {
    currencyModel.getCurrencyByCode(req.params.code, function(err, currency) {
    console.log('controller currency get code')
    if (err)
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
      console.log('res currency get code', currency);
    res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  currency});
  });
};

exports.getCurrencySelect = function(req, res) {
  currencyModel.getCurrencySelect(function(err, currency) {
  console.log('controller currency select')
  if (err)
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
    console.log('res currency select', currency);
  res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  currency});
});
};

