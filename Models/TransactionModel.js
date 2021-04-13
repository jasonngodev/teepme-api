'use strict';

var sql = require('../Config/db');

var TransactionModel = function(transaction){
    this.UID = transaction.UID;
    this.UserName = transaction.UserName;
    this.CurrencyCode = transaction.CurrencyCode;
    this.Amount = transaction.Amount;
    this.AmountAvail = transaction.AmountAvail;
    this.Rate = transaction.Rate;
};

TransactionModel.getDataByRate = function (param, result) {
    sql.query('SELECT * from public."funcTransactionFindByRate"($1,$2)', [param.amount, param.rate], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};

module.exports = TransactionModel;
