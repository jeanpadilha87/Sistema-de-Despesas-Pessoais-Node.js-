const express = require("express");
const app = express();

app.use(express.json());

let expenses = [];


// CRIAR DESPESA (POST)

app.post("/expenses", (req, res) => {
  const { title, amount, category, date, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title obrigatório" });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: "Amount deve ser maior que zero" });
  }

  if (new Date(date) > new Date()) {
    return res.status(400).json({ error: "Data não pode ser futura" });
  }

  const newExpense = {
    id: "exp_" + Date.now(),
    title,
    amount,
    category,
    date,
    description,
    createdAt: new Date()
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});


// LISTAR DESPESAS (GET)

app.get("/expenses", (req, res) => {
  const { category } = req.query;

  if (category) {
    const filtered = expenses.filter(e => e.category === category);
    return res.json(filtered);
  }

  res.json(expenses);
});


// BUSCAR POR ID (GET)

app.get("/expenses/:id", (req, res) => {
  const expense = expenses.find(e => e.id === req.params.id);

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.json(expense);
});


// ATUALIZAR (PUT)

app.put("/expenses/:id", (req, res) => {
  const expense = expenses.find(e => e.id === req.params.id);

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  const { title, amount, category, date, description } = req.body;

  if (title) expense.title = title;
  if (amount) expense.amount = amount;
  if (category) expense.category = category;
  if (date) expense.date = date;
  if (description) expense.description = description;

  res.json(expense);
});


// DELETAR (DELETE)

app.delete("/expenses/:id", (req, res) => {
  const index = expenses.findIndex(e => e.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }

  expenses.splice(index, 1);

  res.json({ message: "Removido com sucesso" });
});


// TOTAL GERAL (EXTRA)

app.get("/expenses/summary/total", (req, res) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  res.json({ total });
});


// TOTAL POR CATEGORIA (EXTRA)

app.get("/expenses/summary/category", (req, res) => {
  const result = {};

  expenses.forEach(e => {
    if (!result[e.category]) {
      result[e.category] = 0;
    }
    result[e.category] += e.amount;
  });

  res.json(result);
});


// ROTA TESTE

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});