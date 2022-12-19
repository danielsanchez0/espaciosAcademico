'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Materia.belongsTo(models.Departamento, {
        foreignKey: 'departamento_id',
        onDelete: 'CASCADE'
      })


      Materia.hasMany(models.Grupo, {
        foreignKey: 'materia',
      })
    }
  }
  Materia.init({
    codigo: DataTypes.STRING,
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
    ,
    cupos_maximos: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    departamento_id: DataTypes.INTEGER,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: "Materias",
    modelName: 'Materia',
  });
  return Materia;
};