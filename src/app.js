const express = require("express");
const Expense = require("./models/expense");

const app = express();

// Permite receber JSON no body das requisições
app.use(express.json());

// ROTA TESTE
app.get("/", (req, res) => {
    res.send("API rodando!");
});

// LISTAR DESPESAS (GET)
app.get("/expenses", (req, res) => {

    // Retorna todas as despesas
    const expenses = Expense.getAll();

    res.status(200).json(expenses);
});

// BUSCAR POR ID (GET)
app.get("/expenses/:id", (req, res) => {

    // Converte o ID para número
    const id = Number(req.params.id);

    // Busca no model
    const expense = Expense.getById(id);

    res.status(200).json(expense);
});

// CRIAR DESPESA (POST)
app.post("/expenses", (req, res) => {

    // Recebe os dados do body
    const { title, amount, category, date, description } = req.body;

    // Cria a despesa
    const expense = Expense.create(
        title,
        amount,
        category,
        date,
        description
    );

    res.status(201).json(expense);
});

// ATUALIZAR (PUT)
app.put("/expenses/:id", (req, res) => {

    const id = Number(req.params.id);

    const { title, amount, category, date, description } = req.body;

    // Atualiza a despesa
    const expense = Expense.update(
        id,
        title,
        amount,
        category,
        date,
        description
    );

    res.status(200).json(expense);
});

// DELETAR (DELETE)
app.delete("/expenses/:id", (req, res) => {

    const id = Number(req.params.id);

    // Remove a despesa
    Expense.delete(id);

    res.status(204).json();
});


// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});