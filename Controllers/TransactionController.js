'use strict';
const db = require("../Models");
const sequelize = db.sequelize;
const TransactionDetail = db.TransactionDetail;
const Transaction = db.Transaction;
const TransactionFile = db.TransactionFile;
const TransactionStatus = db.TransactionStatus;

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
  sequelize.query('SELECT * FROM "funcGetDataTransaction"(:userid, :pageSize, :pageIndex)',
    {
      replacements: {
        userid: transaction.userid,
        pageSize: transaction.pageSize,
        pageIndex: transaction.pageIndex,
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
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data[0]});
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

      var dataStatus = {
        TransactionUID: data.UID,
        StatusCode: 0,
        CreatedBy: transaction.userID
      }

      TransactionStatus.create(dataStatus)
      .then(resStatus => {
        res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: [data]});
      })
      .catch(err => {
        res.status(500).json({responseCode: 500, responseMessage: "error", responseData: [err.message]});
      });
      
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

exports.uploadFile = (req, res) =>{
  try{
    if(!req.files){
      res.status(500).json({responseCode: 500, responseMessage: "No file uploaded!", responseData: null});
    }else if(!req.body.TransactionUID || !req.body.StatusCodeFile){
      res.status(500).json({responseCode: 500, responseMessage: "Bad request to server!", responseData: null});
    }else{
      //filename parameter
      let _file = req.files.fileupload;
      
      //save file to folder
      _file.mv("./Assets/Uploads/" + _file.name);

      let dataUpload = {
        TransactionUID: req.body.TransactionUID,
        FileName: _file.name,
        FilePath: "/Uploads/" + _file.name,
        FileType: _file.mimetype,
        StatusCodeFile: req.body.StatusCodeFile 
      }

      //insert table
      TransactionFile.create(dataUpload)
      .then(data => {

        var dataStatus = {
          TransactionUID: req.body.TransactionUID,
          StatusCode: 1,
          CreatedBy: req.body.userID
        }
  
        TransactionStatus.create(dataStatus)
        .then(resStatus => {
          res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: [data]});
        })
        .catch(err => {
          res.status(500).json({responseCode: 500, responseMessage: "error", responseData: [err.message]});
        });
        //res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
      })
      .catch(err => {
        res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
      })
    }
  }catch(err){
    res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  }
}
