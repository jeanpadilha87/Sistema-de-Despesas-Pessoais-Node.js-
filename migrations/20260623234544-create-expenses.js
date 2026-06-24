'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('expenses', {

            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            description: {
                type: Sequelize.STRING,
                allowNull: false
            },

            amount: {
                type: Sequelize.FLOAT,
                allowNull: false
            },

            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },

            status: {
                type: Sequelize.ENUM('PENDENTE', 'PAGA'),
                allowNull: false,
                defaultValue: 'PENDENTE'
            },

            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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

        await queryInterface.dropTable('expenses');

    }
};