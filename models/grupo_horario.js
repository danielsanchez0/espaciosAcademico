'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupo_horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grupo_horario.init({
    horario_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notEmpty: true,
      }
    },
    grupo_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Grupo_horario',
  });
  return Grupo_horario;
};