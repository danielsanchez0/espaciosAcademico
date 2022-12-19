'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sedes', [{
      bloque: "D",
      nombre: 'Edificio del parque',
      descripcion: "-",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sedes', null, {});
  }
};
