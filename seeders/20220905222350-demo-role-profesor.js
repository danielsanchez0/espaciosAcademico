'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      nombre: 'Profesor',
      descripcion: "Establece su horario y espacios",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
