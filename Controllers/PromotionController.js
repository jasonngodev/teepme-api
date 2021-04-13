'use strict';

var promotionModel = require('../Models/PromotionModel');

exports.getData = function(req, res) {
  promotionModel.getData(function(err, promotion) {
    console.log('controller promotion')
    if (err){
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
    }
    else{
      res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  promotion});
    }
  });
};
