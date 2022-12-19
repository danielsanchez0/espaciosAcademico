'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      nombre: 'daniel fernando sanchez ortiz',
      email: "daniel.1701610339@ucaldas.edu.co",
      password: "12345678",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
