'use strict';

var sql = require('../Config/db');

var LocationModel = function(location){
    this.ID = location.ID;
    this.LocationCode = location.LocationCode;
    this.Name = location.Name;
    this.Address = location.Address;
    this.Images = location.Images;
};

LocationModel.getData = function (result) {
    sql.query('select * from "MasterLocation" order by "LocationName"', function (err, res) {             
        if(err) {
            console.log("error: ", err);
        }
        else{
            result(null, res.rows);
        
        }
    });   
};



module.exports = LocationModel;
