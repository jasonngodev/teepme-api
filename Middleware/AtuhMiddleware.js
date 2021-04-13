const jwt = require("jsonwebtoken");
const configToken = require("../Config/SecretToken");

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if(!token){
      res.status(401).json({responseCode : 401, responseMessage : "error", responseData :  "Require authentication"});
    }
    
    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length);
    }

    if(token){
        jwt.verify(token, configToken.secret, (err, decoded) => {
            if(err){
                res.status(401).json({responseCode : 500, responseMessage : "error", responseData :  "Invalid Token"});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
}

module.exports = {
    checkToken: checkToken
}