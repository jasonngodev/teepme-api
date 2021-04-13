'use strict';

var scrappingWebModel = require('../Models/ScrappingWebModel');

exports.getCurrency = function(req, res) {
    scrappingWebModel.getCurrency(function(err, scrap) {
    console.log('controller scrapping currency')
    if (err){
        res.status(500).send(err);
        console.log('res scrapping currency', scrap);
    }
    else{
        res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  scrap});
    }
  });
};
