'use strict';
const db = require("../Models");
const sequelize = db.sequelize;
const userModel = db.User;

exports.findAll = (req, res) => {
  userModel.findAll({ 
    raw: true
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.findById = (req, res) => {
  userModel.findAll({ 
    raw: true, 
    where: {
      ID: req.params.id
    }
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.findUserLogin = (req, res) => {
  userModel.findAll({ 
    raw: true, 
    where: {
      Phone: req.params.user,
      Password: req.params.password
    }
  })
  .then(data => {
    res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
  })
  .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
  });
};

exports.create = (req, res) => {
  var _user = req.body;
  if(!_user.fullName || !_user.phoneNumber || !_user.email || !_user.password ){
    res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  "Bad request to server."});
    return;
  }

  var userData = {
    UserName: _user.fullName,
    FullName: _user.fullName,
    Email: _user.email,
    Phone: _user.phoneNumber,
    Password: _user.password
  }
  userModel.create(userData)
    .then(data => {
      res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: [data]});
    })
    .catch(err => {
      res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
    });
};


