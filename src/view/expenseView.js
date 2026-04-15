// Retorna todas as despesas
function showExpenses(res, expenses) {
    res.status(200).json(expenses);
}

//Totais gerais
function showSummaryTotal(res, total) {
    res.status(200).json({ total });
}

//Totais por categoria
function showSummaryByCategory(res, totalsByCategory) {
    res.status(200).json(totalsByCategory);
}

// Retorna uma despesa
function showExpense(res, expense) {
    res.status(200).json(expense);
}

// Retorna despesa criada
function showCreated(res, expense) {
    res.status(201).json(expense);
}

// Retorna despesa atualizada
function showUpdated(res, expense) {
    res.status(200).json(expense);
}

// Retorna resposta de remoção
function showDeleted(res) {
    res.status(204).json();
}

module.exports = {
    showExpenses,
    showSummaryTotal,
    showSummaryByCategory,
    showExpense,
    showCreated,
    showUpdated,
    showDeleted
};
