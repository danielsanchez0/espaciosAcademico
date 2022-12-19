'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario_Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'rol_id',
        }
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'usuario_id',
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
    await queryInterface.dropTable('Usuario_Roles');
  }
};