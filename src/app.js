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
