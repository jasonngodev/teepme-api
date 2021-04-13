'use strict';
var fs = require("fs");

exports.getImage = function(req, res) {
    var imageName = req.query.imageName;

    //handles null error 
    if(imageName == ""){
      res.status(500).json({responseCode : 500, responseMessage : "Error", responseData :  "Bad request to server."});
    }
    else{
        fs.readFile('Assets/images/' + imageName, function(err, data) {
            if (err) throw err; // Fail if the file can't be read.
            else {
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data); // Send the file data to the browser.
            }
        });
    }
};
