// Importa o model Expense
const Expense = require("../models/expense");

// Importa operadores do Sequelize
const { Op } = require("sequelize");

// Importa a View
const ExpenseView = require("../view/expenseView");

// CONTROLLER ALTERADO PARA USAR SEQUELIZE

// LISTAR TODAS AS DESPESAS (GET)
async function getAllExpenses(req, res) {

    try {

        const {
            status,
            categoryId,
            startDate,
            endDate,
            minAmount,
            maxAmount
        } = req.query;

        const where = {};

        // Filtro por status
        if (status) {
            where.status = status;
        }

        // Filtro por categoria
        if (categoryId) {
            where.categoryId = Number(categoryId);
        }

        // Filtro por período
        if (startDate && endDate) {

            where.date = {
                [Op.between]: [startDate, endDate]
            };

        }

        // Filtro por valor mínimo e máximo
        if (minAmount || maxAmount) {

            where.amount = {};

            if (minAmount) {
                where.amount[Op.gte] = Number(minAmount);
            }

            if (maxAmount) {
                where.amount[Op.lte] = Number(maxAmount);
            }

        }

        // Busca todas as despesas no banco
        const expenses = await Expense.findAll({
    where
});

console.log("========== DESPESAS ==========");
console.log(JSON.stringify(expenses, null, 2));
console.log("==============================");

ExpenseView.showExpenses(res, expenses);
        console.log(expenses);
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

        res.status(200).json({
            total
        });

    } catch (err) {

        res.status(500).json({
            error: "Erro ao calcular total"
        });

    }
}

// QUANTIDADE DE DESPESAS
async function getExpensesCount(req, res) {

    try {

        // Conta todas as despesas
        const quantidade = await Expense.count();

        res.status(200).json({
            quantidade
        });

    } catch (err) {

        res.status(500).json({
            error: "Erro ao contar despesas"
        });

    }
}

// TOTAL POR CATEGORIA
async function getSummaryByCategory(req, res) {

    try {

        const expenses = await Expense.findAll();

        const totalsByCategory = {};

        expenses.forEach((expense) => {

            if (!totalsByCategory[expense.categoryId]) {
                totalsByCategory[expense.categoryId] = 0;
            }

            totalsByCategory[expense.categoryId] += expense.amount;

        });

        const result = Object.keys(totalsByCategory).map((categoryId) => ({
            categoria: categoryId,
            total: totalsByCategory[categoryId]
        }));

        res.status(200).json(result);

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

        const {
            description,
            amount,
            date,
            status,
            categoryId,
            userId
        } = req.body;

        // Cria a despesa no banco
        const expense = await Expense.create({
            description,
            amount,
            date,
            status,
            categoryId,
            userId
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

        const {
            description,
            amount,
            date,
            status,
            categoryId,
            userId
        } = req.body;

        // Busca a despesa
        const expense = await Expense.findByPk(id);

        // Verifica se existe
        if (!expense) {

            return res.status(404).json({
                error: "Despesa não encontrada"
            });

        }

        // Atualiza os dados
        expense.description = description;
        expense.amount = amount;
        expense.date = date;
        expense.status = status;
        expense.categoryId = categoryId;
        expense.userId = userId;

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
    getExpensesCount,
    getSummaryByCategory,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};