module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("MasterCountry", {
        CountryCode: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        Province: {
            type: Sequelize.STRING
        },
        City: {
            type: Sequelize.STRING
        },
        Districts:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "MasterCountry"
    }
    );

    return Country;
}