// Importa o model Expense
const Expense = require("../models/expense");

// Importa a View
const ExpenseView = require("../view/expenseView");

// CONTROLLER ALTERADO PARA USAR SEQUELIZE

// LISTAR TODAS AS DESPESAS (GET)
async function getAllExpenses(req, res) {

    try {

        // Busca todas as despesas no banco
        const expenses = await Expense.findAll();

        ExpenseView.showExpenses(res, expenses);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao buscar despesas"
        });

    }
}

// TOTAL GERAL
async function getSummaryTotal(req, res) {

    try {

        // Busca todas as despesas
        const expenses = await Expense.findAll();

        // Soma todos os valores
        const total = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        ExpenseView.showSummaryTotal(res, total);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao calcular total"
        });

    }
}

// TOTAL POR CATEGORIA
async function getSummaryByCategory(req, res) {

    try {

        const expenses = await Expense.findAll();

        const totalsByCategory = {};

        expenses.forEach((expense) => {

            if (!totalsByCategory[expense.category]) {
                totalsByCategory[expense.category] = 0;
            }

            totalsByCategory[expense.category] += expense.amount;

        });

        ExpenseView.showSummaryByCategory(res, totalsByCategory);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao calcular categorias"
        });

    }
}

// BUSCAR POR ID (GET)
async function getExpenseById(req, res) {

    try {

        const id = Number(req.params.id);

        // Busca pela chave primária
        const expense = await Expense.findByPk(id);

        ExpenseView.showExpense(res, expense);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao buscar despesa"
        });

    }
}

// CRIAR DESPESA (POST)
async function createExpense(req, res) {

    try {

        const { title, amount, category, date, description } = req.body;

        // Cria a despesa no banco
        const expense = await Expense.create({
            title,
            amount,
            category,
            date,
            description
        });

        ExpenseView.showCreated(res, expense);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao criar despesa"
        });

    }
}

// ATUALIZAR DESPESA (PUT)
async function updateExpense(req, res) {

    try {

        const id = Number(req.params.id);

        const { title, amount, category, date, description } = req.body;

        // Busca a despesa
        const expense = await Expense.findByPk(id);

        // Verifica se existe
        if (!expense) {

            return res.status(404).json({
                error: "Despesa não encontrada"
            });

        }

        // Atualiza os dados
        expense.title = title;
        expense.amount = amount;
        expense.category = category;
        expense.date = date;
        expense.description = description;

        // Salva no banco
        await expense.save();

        ExpenseView.showUpdated(res, expense);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao atualizar despesa"
        });

    }
}

// DELETAR DESPESA (DELETE)
async function deleteExpense(req, res) {

    try {

        const id = Number(req.params.id);

        // Busca a despesa
        const expense = await Expense.findByPk(id);

        // Verifica se existe
        if (!expense) {

            return res.status(404).json({
                error: "Despesa não encontrada"
            });

        }

        // Remove do banco
        await expense.destroy();

        ExpenseView.showDeleted(res);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao deletar despesa"
        });

    }
}

// Exporta os métodos
module.exports = {
    getAllExpenses,
    getSummaryTotal,
    getSummaryByCategory,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};