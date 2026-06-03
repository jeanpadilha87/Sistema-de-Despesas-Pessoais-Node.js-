// Importa a conexão com o banco de dados
const sequelize = require("../config/database");

// Importa os tipos de dados do Sequelize
const { DataTypes } = require("sequelize");

// Alterado para implementar autenticação/autorização com JWT

const User = sequelize.define("users", {

    // ID automático do usuário
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // E-mail do usuário
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    // Senha do usuário
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Nome do usuário
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Perfil do usuário
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user"
    }

});

// Exporta o model
module.exports = User;