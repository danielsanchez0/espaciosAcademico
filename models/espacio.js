'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Espacio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Espacio.belongsTo(models.espacio_tipo, {
        foreignKey: 'tipo_espacio',
        onDelete: 'CASCADE'
      })

      Espacio.belongsTo(models.Sede, {
        foreignKey: 'sede',
        onDelete: 'CASCADE'
      })

      Espacio.hasMany(models.Horario, {
        foreignKey: 'espacio'
      })
    }
  }
  Espacio.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    descripcion: DataTypes.STRING,
    capacidad: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notEmpty: true
      }
    },
    sede: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    tipo_espacio: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Espacio',
  });
  return Espacio;
};