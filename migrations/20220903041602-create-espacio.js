'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Espacios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING
      },
      capacidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sede: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sedes',
          key: 'id',
          as: 'sede'
        }
      },
      tipo_espacio: {
        type: Sequelize.INTEGER,
        references: {
          model: 'espacio_tipos',
          key: 'id',
          as: 'tipo_espacio',
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
    await queryInterface.dropTable('Espacios');
  }
};