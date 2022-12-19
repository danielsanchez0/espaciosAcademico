'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recurso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recurso.belongsTo(models.recurso_tipo, {
        foreignKey: 'tipo_recurso',
        onDelete: 'CASCADE'
      })
    }
  }
  Recurso.init({
    nombre: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    descripcion: DataTypes.STRING,
    estado: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    prestable: {
      type:DataTypes.TINYINT,
      validate:{
        notEmpty: true,
      }
    },
    tipo_recurso: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    id_espacio: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Recurso',
  });
  return Recurso;
};