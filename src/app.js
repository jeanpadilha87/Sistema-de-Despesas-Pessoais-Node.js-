require("./config/database");

const express = require("express");
const app = express();

// Importa os models
const { Expense, User, Category } = require("./models");

// Importa as rotas
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// Receber JSON no body das requisições
app.use(express.json());

// Sincroniza as tabelas do banco de dados
Promise.all([
    Expense.sync(),
    User.sync(),
    Category.sync()
])
    .then(() => {

        console.log("Tabela de despesas criada com sucesso!");
        console.log("Tabela de usuários criada com sucesso!");
        console.log("Tabela de categorias criada com sucesso!");

    })
    .catch((err) => {

        console.error("Erro ao sincronizar tabelas:", err);

    });

// Rota de teste
app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Usa as rotas de despesas
app.use("/", expenseRoutes);

// Usa as rotas de usuários
app.use("/", userRoutes);

// Usa as rotas de categorias
app.use("/", categoryRoutes);

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || "Erro interno do servidor"
    });

});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});