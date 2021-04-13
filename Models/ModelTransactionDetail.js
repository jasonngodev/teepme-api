module.exports = (sequelize, Sequelize) => {
    const TransactionDetail = sequelize.define("TransactionDetail", {
        UID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        TransactionUID: {
            type: Sequelize.STRING
        },
        UIDWallet: {
            type: Sequelize.STRING
        },
        Rate:{
            type: Sequelize.DECIMAL
        },
        Amount:{
            type: Sequelize.DECIMAL
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "TransactionDetail"
    }
    );

    return TransactionDetail;
}