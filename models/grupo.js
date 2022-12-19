'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Grupo.belongsToMany(models.Horario, {
        through: models.Grupo_horario,
        foreignKey: 'grupo_id'
      })

      Grupo.belongsToMany(models.horarioMateria, {
        through: models.Grupo_horario,
        foreignKey: 'grupo_id'
      })

      Grupo.belongsTo(models.Materia, {
        foreignKey: 'materia',
        onDelete: 'CASCADE'
      })

      Grupo.belongsTo(models.User, {
        foreignKey: 'usuario_id',
        onDelete: 'CASCADE'
      })

      Grupo.belongsToMany(models.Semestre, {
        through: models.Semestre_Grupo,
        foreignKey: 'id_grupo'
      })
    }
  }
  Grupo.init({
    grupo: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        notEmpty: true,
      }
    },
    materia: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        notEmpty: true,
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        notEmpty: true,
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: "Grupos",
    modelName: 'Grupo',
  });
  return Grupo;
};