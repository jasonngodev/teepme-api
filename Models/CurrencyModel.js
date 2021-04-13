'use strict';

var sql = require('../Config/db');

var CurrencyModel = function(Currency){
    this.CurrencyCode = Currency.id;
    this.Symbol = Currency.Symbol;
    this.Name = Currency.Name;
    this.SymbolNative = Currency.SymbolNative;
    this.DecimalDigits = Currency.DecimalDigits;
    this.Rounding = Currency.Rounding;
    this.NamePlural = Currency.NamePlural;
};

CurrencyModel.getCurrency = function (result) {
    sql.query('select * from "ViewCurrency"', function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};

CurrencyModel.getCurrencyByCode = function (code, result) {
    sql.query('select * from "ViewCurrency" where "CurrencyCode" = $1', [code], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        }
    });   
};

CurrencyModel.getCurrencySelect = function (result) {
    sql.query('SELECT * from "funcMasterCurrencyGetData"()', function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        }
    });   
};


module.exports = CurrencyModel;
