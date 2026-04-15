const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

// LISTAR DESPESAS (GET)
router.get("/expenses", expenseController.getAllExpenses);

//totais gerais
router.get("/expenses/summary/total", expenseController.getSummaryTotal);

//totais por categoria
router.get("/expenses/summary/category", expenseController.getSummaryByCategory);

// BUSCAR POR ID (GET)
router.get("/expenses/:id", expenseController.getExpenseById);

// CRIAR DESPESA (POST)
router.post("/expenses", expenseController.createExpense);

// ATUALIZAR (PUT)
router.put("/expenses/:id", expenseController.updateExpense);

// DELETAR (DELETE)
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
