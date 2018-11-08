module.exports = function(sequelize, DataType) {
    return sequelize.define('user', {
        user_id: {
            type: DataType.STRING(50),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataType.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataType.TEXT,
            allowNull: false,
        },
        phone: {
            type: DataType.STRING(11),
            allowNull: false,
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        }
    }, {
        timestamps: false,
        tableName: 'user'   // 복수형의 이름 대신 테이블명을 지정
    });
};