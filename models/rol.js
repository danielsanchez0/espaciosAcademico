'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rol.belongsToMany(models.User, {
        through: models.Usuario_Roles,
        foreignKey: 'rol_id',
      })
    }
  }
  Rol.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Rol;
};