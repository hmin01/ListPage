module.exports = function(sequelize, DataTypes) {
    return sequelize.define('item_list', {
        item: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()')
        }
    }, {
        timestamp: false,
        tableName: "item_list"
    });
};