const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const expenseController = require("../controllers/expenseController");

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Lista despesas com filtros
 *     tags: [Despesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de despesas
 */

// LISTAR DESPESAS (GET)
router.get(
    "/expenses",
    authMiddleware,
    expenseController.getAllExpenses
);

/**
 * @swagger
 * /dashboard/total-expenses:
 *   get:
 *     summary: Retorna o total de gastos
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de despesas
 */

// DASHBOARD - TOTAL DE GASTOS
router.get(
    "/dashboard/total-expenses",
    authMiddleware,
    expenseController.getSummaryTotal
);

/**
 * @swagger
 * /dashboard/expenses-count:
 *   get:
 *     summary: Retorna a quantidade de despesas
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade de despesas
 */

// DASHBOARD - QUANTIDADE DE DESPESAS
router.get(
    "/dashboard/expenses-count",
    authMiddleware,
    expenseController.getExpensesCount
);

/**
 * @swagger
 * /dashboard/expenses-by-category:
 *   get:
 *     summary: Retorna os gastos agrupados por categoria
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gastos por categoria
 */

// DASHBOARD - GASTOS POR CATEGORIA
router.get(
    "/dashboard/expenses-by-category",
    authMiddleware,
    expenseController.getSummaryByCategory
);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Busca uma despesa pelo ID
 *     tags: [Despesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Despesa encontrada
 */

// BUSCAR POR ID (GET)
router.get(
    "/expenses/:id",
    authMiddleware,
    expenseController.getExpenseById
);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Cria uma nova despesa
 *     tags: [Despesas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 */

// CRIAR DESPESA (POST)
router.post(
    "/expenses",
    authMiddleware,
    expenseController.createExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Atualiza uma despesa
 *     tags: [Despesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso
 */

// ATUALIZAR DESPESA (PUT)
router.put(
    "/expenses/:id",
    authMiddleware,
    expenseController.updateExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Remove uma despesa
 *     tags: [Despesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Despesa removida com sucesso
 */

// DELETAR DESPESA (DELETE)
router.delete(
    "/expenses/:id",
    authMiddleware,
    expenseController.deleteExpense
);

module.exports = router;