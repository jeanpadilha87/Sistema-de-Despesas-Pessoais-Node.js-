'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('categories', [

            {
                name: 'Alimentação',
                description: 'Gastos com alimentação',
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                name: 'Transporte',
                description: 'Gastos com transporte',
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                name: 'Lazer',
                description: 'Gastos com lazer',
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ]);

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('categories', null, {});

    }
};