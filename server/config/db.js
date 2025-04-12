const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quicard', 'root', 'yourpassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;