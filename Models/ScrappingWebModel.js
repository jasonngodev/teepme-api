'use strict';

var sql = require('../Config/db');

var ScrappingWebModel = function(scrappingWeb){
    this.ID = scrappingWeb.ID;
    this.Name = scrappingWeb.Name;
    this.Max = scrappingWeb.Max;
    this.Average = scrappingWeb.Average;
    this.Volume = scrappingWeb.Volume;
    this.Symbol = scrappingWeb.Symbol;
    this.DateActive = scrappingWeb.DateActive;
    this.IsActive = scrappingWeb.IsActive;
};

ScrappingWebModel.getCurrency = function (result) {
    sql.query('select * from "ViewScrappingCurrency"', function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};

module.exports = ScrappingWebModel;
