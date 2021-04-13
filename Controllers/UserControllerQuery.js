'use strict';

var userModel = require('../Models/UserModel');

exports.getUsers = function(req, res) {
  userModel.getUsers(function(err, task) {
    console.log('controller user')
    if (err){
        res.send(err);
        console.log('res user', task);
    }
    else{
        res.status(200).json(task);
    }
  });
};

exports.getUserById = function(req, res) {
    userModel.getUserById(req.params.id, function(err, user) {
    console.log('controller user getid')
    if (err)
      res.send(err);
      console.log('res user getid', user);
    res.status(200).json(user);
  });
};

exports.getUserByUserName = function(req, res) {
    userModel.getUserByUserName(req.params.username, function(err, user) {
    console.log('controller user get username')
    if (err)
      res.send(err);
      console.log('res user get username', user);
    res.status(200).json(user);
  });
};

exports.getUserLogin = function(req, res) {
  var user = req.params;
  //handles null error 
  if(!user.username || !user.password){
    res.status(400).send({ error:true, message: 'Bad request to server!' });
  }
  else{
    userModel.getUserLogin(user, function(err, user) {
      if (err)
        res.status(400).json({responseCode: 400, responseMessage: "Error", responseData: err});
      res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: user});
    });
  }
  
};

exports.insert = function(req, res) {
    var user = req.body;

    //handles null error 
    if(!user.username || !user.fullname || !user.password || !user.role){
        res.status(400).send({ error:true, message: 'Bad request to server!' });
    }
    else{
        userModel.createUser(user, function(err, response) {
            if (err)
                res.send(err);
            //res.json(auto);
            res.statusCode = 200;
            res.status = "Ok";
            return res.json();
        });
    }
};
