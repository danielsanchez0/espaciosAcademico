'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Reserva.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })

      Reserva.belongsTo(models.Espacio, {
        foreignKey: 'espacio',
        onDelete: 'CASCADE'
      })
    }
  }
  Reserva.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    notes: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    espacio: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    estado: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};