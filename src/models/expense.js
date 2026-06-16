// Importa a conexão com o banco de dados
const sequelize = require("../config/database");

// Importa os tipos de dados do Sequelize
const { DataTypes } = require("sequelize");

// Model de despesas

const Expense = sequelize.define("expenses", {

    // ID automático da despesa
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Descrição da despesa
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Valor da despesa
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    // Data da despesa
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    // Status da despesa
    status: {
        type: DataTypes.ENUM("PENDENTE", "PAGA"),
        allowNull: false,
        defaultValue: "PENDENTE"
    },

    // Chave estrangeira para categoria
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // Chave estrangeira para usuário
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

// Exporta o model
module.exports = Expense;