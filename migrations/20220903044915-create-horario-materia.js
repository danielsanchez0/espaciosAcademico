'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HorarioMateria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hora_inicial: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hora_final: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      espacio: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Espacios',
          key: 'id',
          as: 'espacio',
        },
        allowNull: true
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
    await queryInterface.dropTable('HorarioMateria');
  }
};