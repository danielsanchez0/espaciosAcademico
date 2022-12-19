'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sedes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bloque: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Sedes');
  }
};