const db = require("../Models");
const Country = db.Country;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    
    Country.findAll({ raw: true })
    .then(data => {
        res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
    })
    .catch(err => {
        res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Country.findAll({
        where: {
            CountryCode: id
        }
    })
    .then(data => {
        res.status(200).json({responseCode: 200, responseMessage: "Ok", responseData: data});
    })
    .catch(err => {
        res.status(500).json({responseCode: 500, responseMessage: "error", responseData: err.message});
    });
};
