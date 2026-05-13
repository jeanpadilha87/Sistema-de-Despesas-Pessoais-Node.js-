// Importa a conexão com o banco de dados
const sequelize = require("../config/database");

// Importa os tipos de dados do Sequelize
const { DataTypes } = require("sequelize");

// Alterado para usar Sequelize

const Expense = sequelize.define("expenses", {

    // ID automático da despesa
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Título da despesa
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Valor da despesa
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    // Categoria da despesa
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Data da despesa
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Descrição da despesa
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }

});

// Exporta o model
module.exports = Expense;