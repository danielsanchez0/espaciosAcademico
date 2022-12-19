'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Semestres', [{
      nombre: '2023-1',
      fechaInicio: '2022-02-10',
      fechaFinal: '2022-07-10',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Semestres', null, {});
  }
};