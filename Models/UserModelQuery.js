'use strict';

var sql = require('../Config/db');

var UserModel = function(user){
    this.id = user.id;
    this.userName = user.userName;
    this.fullName = user.fullName;
    this.password = user.password;
    this.roleID = user.roleID;
};

UserModel.getUsers = function (result) {
    sql.query('select * from "MasterUsers"', function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};

UserModel.getUserById = function (id, result) {
    sql.query('select * from "MasterUsers" where "id" = $1', [id], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        }
    });   
};

UserModel.getUserByUserName = function (username, result) {
    sql.query('select * from "MasterUsers" where "UserName" = $1', [username], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        }
    });   
};

UserModel.getUserLogin = function (req, result) {
    var data = [
        req.username,
        req.password
    ];
    sql.query('select * from "MasterUsers" where "UserName" = $1 and "Password" = $2', data, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        }
    });   
};

UserModel.createUser = function (req, result) {
    var sqldata = 'insert into master_user ("userName", "fullName", password, role) values ($1, $2, $3, $4)';
    // Retrieve the data to insert from the POST body
    var data = [
        req.username,
        req.fullname,
        req.password,
        req.role
    ];
    sql.query(sqldata, data, function (err, res) {             
        if(err) {
            console.log("error insert data: ", err);
            result(err, null);
        }
        else{
            result(null, "success");
        }
    });   
};

UserModel.updateUser = function (req, result) {
    var sqldata = "insert into master_user (autodebet_bank_nmsing, autodebet_bank_name, autodebet_buku_acnt) values (?,?,?)";
    // Retrieve the data to insert from the POST body
    var data = [
        req.autodebet_bank_nmsing,
        req.autodebet_bank_name,
        req.autodebet_buku_acnt
    ];

    sql.query(sqldata, data, function (err, res) {             
        if(err) {
            console.log("error insert data: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

UserModel.deleteUser = function (req, result) {
    var sqldata = "insert into master_user (autodebet_bank_nmsing, autodebet_bank_name, autodebet_buku_acnt) values (?,?,?)";
    // Retrieve the data to insert from the POST body
    var data = [
        req.autodebet_bank_nmsing,
        req.autodebet_bank_name,
        req.autodebet_buku_acnt
    ];

    sql.query(sqldata, data, function (err, res) {             
        if(err) {
            console.log("error insert data: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports= UserModel;
