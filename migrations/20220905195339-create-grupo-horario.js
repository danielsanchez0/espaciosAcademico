'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grupo_horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      horario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HorarioMateria',
          key: 'id',
          as: 'horario_id',
        }
      },
      grupo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Grupos',
          key: 'id',
          as: 'grupo_id',
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
    await queryInterface.dropTable('Grupo_horarios');
  }
};