'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Horario.belongsToMany(models.Grupo, {
        through: models.Grupo_horario,
        foreignKey: 'horario_id'
      })

      Horario.belongsTo(models.Espacio, {
        foreignKey: 'espacio',
        onDelete: 'CASCADE'
      })
    }
  }
  Horario.init({
    endDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
      }
    },
    rRule: {
      type: DataTypes.STRING
    },
    espacio: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    tableName: "Horarios",
    modelName: 'Horario',

  });
  return Horario;
};