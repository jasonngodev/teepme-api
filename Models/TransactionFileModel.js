module.exports = (sequelize, Sequelize) => {
    const TransactionFile = sequelize.define("TransactionFile", {
        UID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        TransactionUID: {
            type: Sequelize.UUID
        },
        FileName: {
            type: Sequelize.STRING
        },
        FilePath:{
            type: Sequelize.STRING
        },
        FileType:{
            type: Sequelize.STRING
        },
        StatusCodeFile:{
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "TransactionFile"
    }
    );

    return TransactionFile;
}
