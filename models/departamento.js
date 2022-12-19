'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Departamento.hasMany(models.Materia, {
        foreignKey: 'departamento_id'
      })
    }
  }
  Departamento.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Departamento',
  });
  return Departamento;
};