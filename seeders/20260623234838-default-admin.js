'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('users', [

            {
                name: 'Administrador',
                email: 'admin@email.com',
                password: '$2b$10$EGF/2DQsZJWPMyjxq7DI4.Yroj3085MtiMO3aMftK9.FvutoXvo5O',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('users', {
            email: 'admin@email.com'
        }, {});

    }
};