const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false  // Este campo es obligatorio
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false  // Este campo es obligatorio
    }
}, {
    timestamps: false
});

module.exports = Estudiante;