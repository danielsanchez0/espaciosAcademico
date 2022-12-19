'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cupos_maximos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Departamentos',
          key: 'id',
          as: 'departamento_id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Materias');
  }
};