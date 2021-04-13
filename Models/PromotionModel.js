'use strict';

var sql = require('../Config/db');

var PromotionModel = function(promotion){
    this.UID = promotion.UID;
    this.Title = promotion.Title;
    this.Desc = promotion.Desc;
};

PromotionModel.getData = function (result) {
    sql.query('SELECT * from public."Promotion"', function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};

module.exports = PromotionModel;
