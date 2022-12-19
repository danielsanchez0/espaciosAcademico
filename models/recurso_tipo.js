'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recurso_tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      recurso_tipo.hasMany(models.Recurso,{
        foreignKey: 'id',
      })
    }
  }
  recurso_tipo.init({
    nombre: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recurso_tipo',
  });
  return recurso_tipo;
};