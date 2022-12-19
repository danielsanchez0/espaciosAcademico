'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Roles, {
        through: models.Usuario_Roles,
        foreignKey: 'usuario_id'
      })
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: /[^@ \t\r\n]+@ucaldas+\.[^@ \t\r\n]+/,
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};