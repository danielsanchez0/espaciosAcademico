'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class espacio_tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      espacio_tipo.hasMany(models.Espacio,{
        foreignKey: 'id',
      })
    }
  }
  espacio_tipo.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'espacio_tipo',
  });
  return espacio_tipo;
};