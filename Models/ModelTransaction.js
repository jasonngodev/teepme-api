module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
        UID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        TransactionCode: {
            type: Sequelize.STRING
        },
        CurrencyCode: {
            type: Sequelize.STRING
        },
        PaymentCode:{
            type: Sequelize.STRING
        },
        LocationCode:{
            type: Sequelize.STRING
        },
        PickupCode:{
            type: Sequelize.STRING
        },
        UserID:{
            type: Sequelize.STRING
        },
        RateTotal:{
            type: Sequelize.DECIMAL
        },
        VolumeTotal:{
            type: Sequelize.DECIMAL
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "Transaction"
    }
    );

    return Transaction;
}
