'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('categories', {

            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }

        });

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.dropTable('categories');

    }
};