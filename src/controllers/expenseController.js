const Expense = require("../models/expense");
const ExpenseView = require("../view/expenseView");

// LISTAR DESPESAS (GET)
function getAllExpenses(req, res) {

    // Retorna todas as despesas
    const expenses = Expense.getAll();

    ExpenseView.showExpenses(res, expenses);
}

//total geral
function getSummaryTotal(req, res) {

    const total = Expense.getTotal();

    ExpenseView.showSummaryTotal(res, total);
}

//totais por categoria
function getSummaryByCategory(req, res) {

    const totalsByCategory = Expense.getTotalByCategory();

    ExpenseView.showSummaryByCategory(res, totalsByCategory);
}

// BUSCAR POR ID (GET)
function getExpenseById(req, res) {

    // Converte o ID para número
    const id = Number(req.params.id);

    // Busca no model
    const expense = Expense.getById(id);

    ExpenseView.showExpense(res, expense);
}

// CRIAR DESPESA (POST)
function createExpense(req, res) {

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

    ExpenseView.showCreated(res, expense);
}

// ATUALIZAR (PUT)
function updateExpense(req, res) {

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

    ExpenseView.showUpdated(res, expense);
}

// DELETAR (DELETE)
function deleteExpense(req, res) {

    const id = Number(req.params.id);

    // Remove a despesa
    Expense.delete(id);

    ExpenseView.showDeleted(res);
}

module.exports = {
    getAllExpenses,
    getSummaryTotal,
    getSummaryByCategory,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
