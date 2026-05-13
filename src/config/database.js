const { Sequelize } = require("sequelize");

// Cria a conexão com o banco de dados
const sequelize = new Sequelize(
    "despesas",
    "root",
    "",
    {
        dialect: "mysql"
    }
);

// Testa a conexão com o banco
sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco realizada com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao conectar no banco:", err);
    });

// Exporta a conexão
module.exports = sequelize;