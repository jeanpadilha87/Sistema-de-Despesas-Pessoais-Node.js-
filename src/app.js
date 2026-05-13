require("./config/database");

// Importa o model Expense
const Expense = require("./models/expense");

// Cria a tabela automaticamente no banco
Expense.sync()
    .then(() => {
        console.log("Tabela de despesas criada com sucesso!");
    })
    .catch((err) => {
        console.error("Erro ao criar tabela:", err);
    });

const express = require("express");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// receber JSON no body das requisições
app.use(express.json());

// ROTA TESTE
app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Usa as rotas de despesas
app.use("/", expenseRoutes);

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});