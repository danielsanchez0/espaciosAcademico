'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sede extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sede.hasMany(models.Espacio, {
        foreignKey: 'sede'
      })
    }
  }
  Sede.init({
    bloque: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    descripcion: DataTypes.STRING,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Sede',
  });
  return Sede;
};