'use strict';

var sql = require('../Config/db');

var TransactionModel = function(transaction){
    this.UID = transaction.UID;
    this.TransactionCode = transaction.TransactionCode;
    this.CurrencyCode = transaction.CurrencyCode;
    this.PaymentCode = transaction.PaymentCode;
    this.LocationCode = transaction.LocationCode;
    this.PickUpCode = transaction.PickUpCode;
    this.UserName = transaction.UserName;
    this.RateTotal = transaction.RateTotal;
    this.VolumeTotal = transaction.VolumeTotal;
};

TransactionModel.getData = function (result) {
    sql.query('SELECT * from "Transaction"', function (err, res) {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};

TransactionModel.insert = function (req, result) {
    var sqldata = 'insert into "Transaction" ("TransactionCode", "CurrencyCode", "PaymentCode", "LocationCode", "PickupCode", "UserName", "RateTotal", "VolumeTotal") ' + 
            'values ($1, $2, $3, $4, $5, $6, $7, $8)';
    // Retrieve the data to insert from the POST body
    var data = [
        req.transactionCode,
        req.currencyCode,
        req.paymentCode,
        req.locationCode,
        req.pickupCode,
        req.userName,
        req.rateTotal,
        req.volumeTotal
    ];
    sql.query(sqldata, data, function (err, res) {             
        if(err) {
            console.log("error insert data transaction buy: ", err);
            result(err, null);
        }
        else{
            result(null, "success");
        }
    });
};

TransactionModel.insertDetail = function (req, result) {
    var sqldata = 'insert into "TransactionDetail" ("TransactionCode", "UIDWallet", "Amount", "Rate") ' + 
            'values ($1, $2, $3, $4)';
    // Retrieve the data to insert from the POST body
    var data = [
        req.TransactionCode,
        req.UIDWallet,
        req.Amount,
        req.Rate
    ];
    const shouldAbort = err => {
        if (err) {
          console.error('Error in transaction', err.stack)
          sql.query('ROLLBACK', err => {
            if (err) {
              console.error('Error rolling back client', err.stack)
            }
            // release the client back to the pool
          })
        }
        return !!err
      }

    sql.query('BEGIN', err => {
        if (shouldAbort(err)) {
            result(err, null);
        }

        sql.query(sqldata, data, function (err, res) {       
            if (shouldAbort(err)) {
                sql.query('delete from "Transaction" where "TransactionCode" = $1', [req.TransactionCode], function (errDelete, resDelete) {             
                    if(err) {
                        console.log("error delete transaction buy: ", errDelete);
                        result(errDelete, null);
                    }
                });
                result(err, null);
            }      
            sql.query('COMMIT', err => {
                if (err) {
                    console.error('Error committing transaction', err.stack)
                    result(err, null);
                }else{
                    result(null, "success ok");
                }
            });
        });
    });  
    
};

module.exports = TransactionModel;
