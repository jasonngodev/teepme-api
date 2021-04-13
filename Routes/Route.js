'use strict';
let middleware = require("../Middleware/AtuhMiddleware");
const handlerGenerator = require("../Middleware/HandlerGenerator");

let handlers = new handlerGenerator();


module.exports = function(app) {
    //login api 
    app.post("/login", handlers.login);

    /*
    var userController = require('../Controllers/UserController');
    app.route('/user').get(middleware.checkToken, userController.getUsers);
    app.route('/user/:id').get(middleware.checkToken, userController.getUserById);
    app.route('/user').post(middleware.checkToken, userController.insert);
    app.route('/user/:username/:password').get(middleware.checkToken, userController.getUserByUserName);
    app.route('/update').get(middleware.checkToken, userController.getUsers);
    app.route('/delete').get(middleware.checkToken, userController.getUsers);
    
    var currencyController = require('../Controllers/CurrencyController');
    app.route('/currency').get(middleware.checkToken, currencyController.getCurrency);
    app.route('/currency/:code').get(middleware.checkToken, currencyController.getCurrencyByCode);
    app.route('/currencyshow/').get(middleware.checkToken, currencyController.getCurrencySelect);
    
    var scrappingWebController = require('../Controllers/ScrappingWebController');
    app.route('/scrap/currency/').get(middleware.checkToken, scrappingWebController.getCurrency);

    //transaction
    var transactionController = require('../Controllers/TransactionController');
    app.route('/transaction/find/').post(middleware.checkToken, transactionController.getDataByRate);

    //location
    var locationController = require('../Controllers/LocationController');
    app.route('/location/').get(middleware.checkToken, locationController.getData);

    //promotion
    var promotionController = require('../Controllers/PromotionController');
    app.route('/promotion/').get(middleware.checkToken, promotionController.getData);
    //images show
    //var imageController = require('../Controllers/ImagesController');
    //app.route('/images').get(imageController.getImage);
    */

   var countryController = require('../Controllers/ControllerCountry');
   app.route('/country').get(countryController.findAll);
   app.route('/country/:id').get(countryController.findOne);
   
   var userController = require('../Controllers/UserController');
   app.route('/user').get(userController.findAll);
   app.route('/user/:id').get(userController.findById);
   app.route('/user').post(userController.create);
   app.route('/user/:user/:password').get(userController.findUserLogin);
   //app.route('/update').get(userController.getUsers);
   //app.route('/delete').get(userController.getUsers);
   
   var currencyController = require('../Controllers/CurrencyController');
   app.route('/currency').get(currencyController.getCurrency);
   app.route('/currency/:code').get(currencyController.getCurrencyByCode);
   app.route('/currencyshow/').get(currencyController.getCurrencySelect);
   
   var scrappingWebController = require('../Controllers/ScrappingWebController');
   app.route('/scrap/currency/').get(scrappingWebController.getCurrency);

   //transaction
   //var transactionController = require('../Controllers/TransactionController');
   //app.route('/transaction/find/').post(transactionController.getDataByRate);

   //transaction buy
   var transactionController = require('../Controllers/TransactionController');
   app.route('/transaction/rate/').post(transactionController.findRate);
   app.route('/transaction/').get(transactionController.findAll);
   app.route('/transaction/user/:userid/:pageSize/:pageIndex').get(transactionController.findByUserId);
   app.route('/transaction/:code').get(transactionController.findOne);
   app.route('/transaction/id/:id').get(transactionController.findByID);
   app.route('/transaction/insert/').post(transactionController.create);
   app.route('/transaction/insert/detail/').post(transactionController.createDetail);
   app.route('/transaction/detail/:code').get(transactionController.findDetailByCode);
   
   //upload transaction file
   app.route('/transaction/file/').post(transactionController.uploadFile);
   

   //location
   var locationController = require('../Controllers/LocationController');
   app.route('/location/').get(locationController.getData);

   //promotion
   var promotionController = require('../Controllers/PromotionController');
   app.route('/promotion/').get(promotionController.getData);

   //payment
   var paymentController = require('../Controllers/PaymentController');
   app.route('/payment/').get(paymentController.getData);

};