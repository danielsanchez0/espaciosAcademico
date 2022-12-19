'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semestre_Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Semestre_Grupo.init({
    id_semestre: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Semestre_Grupo',
  });
  return Semestre_Grupo;
};