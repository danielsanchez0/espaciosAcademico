'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Materias', [{
      id: 1,
      codigo: "145G8F",
      nombre: 'Inteligencia De Negocios',
      cupos_maximos: 20,
      departamento_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materias', null, {});
  }
};
