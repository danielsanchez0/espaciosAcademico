'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HorarioMateria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      HorarioMateria.belongsToMany(models.Grupo, {
        through: models.Grupo_horario,
        foreignKey: 'horario_id'
      })

      HorarioMateria.belongsTo(models.Espacio, {
        foreignKey: 'espacio',
        onDelete: 'CASCADE'
      })
    }
  }
  HorarioMateria.init({
    dia: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:true,
        isIn: [['MO','TU','WE','TH','FR','SA']],
        len: [2,2]
      }
    },
    hora_inicial: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        min: 6,
        max: 22,
        isInt: true
      }
    },
    hora_final: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        min: 6,
        max: 22,
        isInt: true
      },
      espacio: {
        type: DataTypes.INTEGER,
      }
    }
  }, {
    sequelize,
    modelName: 'horarioMateria',
    tableName: 'HorarioMateria'
  });
  return HorarioMateria;
};