const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const expenseController = require("../controllers/expenseController");

// LISTAR DESPESAS (GET)
router.get(
    "/expenses",
    authMiddleware,
    expenseController.getAllExpenses
);

// DASHBOARD - TOTAL DE GASTOS
router.get(
    "/dashboard/total-expenses",
    authMiddleware,
    expenseController.getSummaryTotal
);

// DASHBOARD - QUANTIDADE DE DESPESAS
router.get(
    "/dashboard/expenses-count",
    authMiddleware,
    expenseController.getExpensesCount
);

// DASHBOARD - GASTOS POR CATEGORIA
router.get(
    "/dashboard/expenses-by-category",
    authMiddleware,
    expenseController.getSummaryByCategory
);

// BUSCAR POR ID (GET)
router.get(
    "/expenses/:id",
    authMiddleware,
    expenseController.getExpenseById
);

// CRIAR DESPESA (POST)
router.post(
    "/expenses",
    authMiddleware,
    expenseController.createExpense
);

// ATUALIZAR DESPESA (PUT)
router.put(
    "/expenses/:id",
    authMiddleware,
    expenseController.updateExpense
);

// DELETAR DESPESA (DELETE)
router.delete(
    "/expenses/:id",
    authMiddleware,
    expenseController.deleteExpense
);

module.exports = router;