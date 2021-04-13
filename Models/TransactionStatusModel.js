module.exports = (sequelize, Sequelize) => {
    const TransactionStatus = sequelize.define("TransactionStatus", {
        UID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        TransactionUID: {
            type: Sequelize.STRING
        },
        StatusCode: {
            type: Sequelize.INTEGER
        },
        DateCreated:{
            type: Sequelize.DATE
        },
        CreatedBy:{
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "TransactionStatus"
    }
    );

    return TransactionStatus;
}