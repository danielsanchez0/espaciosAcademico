'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grupos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grupo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      materia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Materias',
          key: 'id',
          as: 'materia',
        }
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'usuario_id',
        }
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Grupos');
  }
};