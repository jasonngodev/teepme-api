module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("MasterUsers", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: {
            type: Sequelize.STRING
        },
        FullName: {
            type: Sequelize.STRING
        },
        Password:{
            type: Sequelize.STRING
        },
        Email:{
            type: Sequelize.STRING
        },
        Phone:{
            type: Sequelize.STRING
        },
        Address:{
            type: Sequelize.STRING
        },
        City:{
            type: Sequelize.STRING
        }, 
        CountryCode:{
            type: Sequelize.STRING
        },
        Photo:{
            type: Sequelize.STRING
        },
        RoleID:{
            type: Sequelize.INTEGER
        },
        ActivationCode:{
            type: Sequelize.STRING
        },
        StatusCode:{
            type: Sequelize.STRING
        },
        DateCreated:{
            type: Sequelize.DATE
        },
        CreatedBy:{
            type: Sequelize.STRING
        },
        DateModified:{
            type: Sequelize.DATE
        },
        ModifiedBy:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "MasterUsers"
    }
    );

    return User;
}