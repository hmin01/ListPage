'use strict';
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Board = require('./board_table')(sequelize, Sequelize);
db.User = require('./user_table')(sequelize, Sequelize);
db.Item = require('./item_table')(sequelize, Sequelize);

db.User.hasMany(db.Board, {foreignKey: 'author_id', sourceKey: 'id'});
db.Board.belongsTo(db.User, {foreignKey: 'author_id', targetKey: 'id'})

module.exports = db;
