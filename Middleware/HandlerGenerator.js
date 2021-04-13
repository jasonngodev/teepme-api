let jwt = require("jsonwebtoken");
let config = require("../Config/SecretToken");

class HandlerGenerator{
    login(req, res){
        let username = req.body.username;
        let password = req.body.password;

        let authUsername =  "teepme-user";
        let authPassword =  "teepme-password";

        if(username && password){
            if(username === authUsername && password === authPassword){
                let token = jwt.sign({username, password},
                    config.secret,
                    {
                        expiresIn: "24h"
                    }
                );

                res.status(200).json({
                    responseCode : 200, 
                    responseMessage : "Authentication successfully", 
                    responseData :  {
                        token: token,
                        user: {
                            firstName: "Super Admin",
                            lastename: "Teepme"
                        }
                    }
                });
            }else{
                res.status(401).json({
                    responseCode : 401, 
                    responseMessage : "error", 
                    responseData :  "Incorrect Username or Password"
                });
            }
        }else{
            res.status(400).json({
                responseCode : 400, 
                responseMessage : "error", 
                responseData :  "Authentication failed!"
            });
        }
    }
}

module.exports = HandlerGenerator;