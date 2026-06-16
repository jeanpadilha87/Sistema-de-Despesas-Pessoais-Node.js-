require("./config/database");

const express = require("express");
const app = express();

// Importa os models
const Expense = require("./models/expense");
const User = require("./models/user");
const Category = require("./models/category");

// Importa as rotas
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// Receber JSON no body das requisições
app.use(express.json());

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

// Cria a tabela de categorias automaticamente no banco
Category.sync()
    .then(() => {
        console.log("Tabela de categorias criada com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao criar tabela de categorias:", err);
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

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});