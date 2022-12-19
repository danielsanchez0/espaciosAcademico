'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semestre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Semestre.belongsToMany(models.Grupo, {
        through: models.Semestre_Grupo,
        foreignKey: 'id_semestre'
      })
    }
  }
  Semestre.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        is: /^[0-9]{4}(-[0-9]{1})?$/,
      }
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      notEmpty: true

    },
    fechaFinal: {
      type: DataTypes.DATEONLY,
      notEmpty: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Semestre',
  });
  return Semestre;
};