'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      rRule: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Horarios');
  }
};