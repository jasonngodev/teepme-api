'use strict';
const db = require("../Models");
const sequelize = db.sequelize;
const TransactionDetail = db.TransactionDetail;
const Transaction = db.Transaction;

'use strict';

var transactionModel = require('../Models/TransactionModel');

exports.getDataByRate = function(req, res) {
    var transaction = req.body;

    //handles null error 
    if(!transaction.amount || !transaction.rate){
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  "Bad request to server."});
    }
    else{
      transactionModel.getDataByRate(transaction, function(err, response) {
        if (err)
          return res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  err});
        //res.json(auto);
        return res.status(200).json({responseCode : 200, responseMessage : "Ok", responseData :  response});
      });
    }
};

//transaction header
exports.findRate = (req, res) => {
  var transaction = req.body;

  sequelize.query('SELECT * FROM "funcTransactionFindByRate"(:amount, :rate)',
    {
      replacements: {
        amount: transaction.amount,
        rate: transaction.rate
    }
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data[0]});
  })
  .catch(err => {
  res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.findAll = (req, res) => {
  Transaction.findAll({ 
    raw: true
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.findByUserId = (req, res) => {
  var transaction = req.params;
  sequelize.query('SELECT * FROM "funcGetDataTransaction"(:userid)',
    {
      replacements: {
        userid: transaction.userid
    }
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data[0]});
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.findOne = (req, res) => {
  const transactionCode = req.params.code;
  Transaction.findAll({ 
    where: {
      TransactionCode: transactionCode
    }
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.findByID = (req, res) => {
  const id = req.params.id;
  //get header
  sequelize.query('SELECT * FROM "funcGetDataTransactionByID"(:uid)',
    {
      replacements: {
        uid: id
    }
  })
  .then(data => {
    TransactionDetail.findAll({ 
      where: {
        TransactionUID: id
      }
    }).then(dataDetail => {
      res.status(200).json({responseCode: 200, responseMessage: "Ok", 
        responseData: [{transaction: data}, {detail: dataDetail}]
      });
    }).catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
    })
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.create = (req, res) => {
  var transaction = req.body;
  //handles null error 
  if(!transaction.transactionCode || !transaction.currencyCode || !transaction.paymentCode 
      || !transaction.locationCode || !transaction.pickupCode || !transaction.userID 
      || !transaction.rateTotal || !transaction.volumeTotal){
    res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  "Bad request to server."});
    return;
  }

  var transactionModel = {
    TransactionCode: transaction.transactionCode,
    CurrencyCode: transaction.currencyCode,
    PaymentCode: transaction.paymentCode,
    LocationCode: transaction.locationCode,
    PickupCode: transaction.pickupCode,
    UserID: transaction.userID,
    RateTotal: transaction.rateTotal,
    VolumeTotal: transaction.volumeTotal,
  }
  Transaction.create(transactionModel)
    .then(data => {
      res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: [data]});
    })
    .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: [err.message]});
    });
};

//transactaion detail
exports.createDetail = (req, res) => {
  var transaction = req.body;
  //handles null error 
  if(!transaction.TransactionUID || !transaction.UIDWallet || !transaction.Amount || !transaction.Rate){
    res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  "Bad request to server."});
    return;
  }

  TransactionDetail.create(transaction)
    .then(data => {
      res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: [data]});
    })
    .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: [err.message]});
    });
};


exports.findDetailByCode = (req, res) => {
  const transactionCode = req.params.code;

  TransactionDetail.findAll({
    where: {
      TransactionUID: transactionCode
    } 
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
  })
  .catch(err => {
    res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

