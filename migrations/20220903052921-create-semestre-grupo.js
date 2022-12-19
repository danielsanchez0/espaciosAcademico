'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Semestre_Grupos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_semestre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Semestres',
          key: 'id',
          as: 'semestre',
        }
      },
      id_grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Grupos',
          key: 'id',
          as: 'grupo',
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
    await queryInterface.dropTable('Semestre_Grupos');
  }
};