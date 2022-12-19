'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario_Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Usuario_Rol.init({
    estado: DataTypes.BOOLEAN,
    rol_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario_Roles',
  });
  return Usuario_Rol;
};