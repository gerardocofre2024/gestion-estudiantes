const { Sequelize } = require('sequelize');

// Configuración de la base de datos con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Archivo de base de datos
});

module.exports = sequelize;