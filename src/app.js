require("./config/database");

// Importa os models
const Expense = require("./models/expense");
const User = require("./models/user");

// Importa as rotas
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");

const express = require("express");
const app = express();

// Cria a tabela de despesas automaticamente no banco
Expense.sync()
    .then(() => {
        console.log("Tabela de despesas criada com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao criar tabela de despesas:", err);
    });

// Cria a tabela de usuários automaticamente no banco
User.sync()
    .then(() => {
        console.log("Tabela de usuários criada com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao criar tabela de usuários:", err);
    });

// Receber JSON no body das requisições
app.use(express.json());

// ROTA TESTE
app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Usa as rotas de despesas
app.use("/", expenseRoutes);

// Usa as rotas de usuários
app.use("/", userRoutes);

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});