'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('espacio_tipos', [{
      nombre: 'SALA DE INFORMATICA',
      descripcion: "salas con equipos tecnologicos",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('espacio_tipos', null, {});
  }
};