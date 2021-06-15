var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
// var environment = process.env.NODE_ENV || 'development';
var environment = 'development';
var config = require(__dirname + '/../config/config.json')['development'];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
        host: config.host,
        dialect: config.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
);

var db = {};


db['User'] = require('./user')(sequelize, Sequelize.DataTypes);
db['respClub'] = require('./respClub')(sequelize, Sequelize.DataTypes);
db['Evenement'] = require('./evenement')(sequelize, Sequelize.DataTypes);
db['Club'] = require('./club')(sequelize, Sequelize.DataTypes);
db['Membership'] = require('./membership')(sequelize, Sequelize.DataTypes);


db.Club.hasMany(db.Evenement);
db.Evenement.belongsTo(db.Club);
db.Club.hasOne(db.respClub);
db.respClub.belongsTo(db.Club);
db.User.hasOne(db.respClub);
db.respClub.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;