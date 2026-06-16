// Importa a conexão com o banco de dados
const sequelize = require("../config/database");

// Importa os tipos de dados do Sequelize
const { DataTypes } = require("sequelize");

// Model de categorias

const Category = sequelize.define("categories", {

    // ID automático da categoria
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Nome da categoria
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Descrição da categoria
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }

});

// Exporta o model
module.exports = Category;