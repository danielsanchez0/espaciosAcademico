'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recursos', {
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
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prestable: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      tipo_recurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'recurso_tipos',
          key: 'id',
          as: 'tipo_recurso',
        }
      },
      id_espacio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Espacios',
          key: 'id',
          as: 'id_espacio',
        }
      },
      activo: {
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
    await queryInterface.dropTable('Recursos');
  }
};