// View responsável pelas respostas da API de Despesas.

// LISTAR TODAS AS DESPESAS
function showExpenses(res, expenses) {

    const expensesWithLinks = expenses.map((expense) => ({

        ...expense.toJSON(),

        _links: {

            self: {

                href: `/expenses/${expense.id}`

            }

        }

    }));

    res.status(200).json(expensesWithLinks);

}


// TOTAL GERAL
function showSummaryTotal(res, total) {

    res.status(200).json({

        total,

        _links: {

            expenses: {

                href: "/expenses"

            }

        }

    });

}


// TOTAL POR CATEGORIA
function showSummaryByCategory(res, totalsByCategory) {

    res.status(200).json({

        totalsByCategory,

        _links: {

            expenses: {

                href: "/expenses"

            }

        }

    });

}


// BUSCAR UMA DESPESA
function showExpense(res, expense) {

    res.status(200).json({

        ...expense.toJSON(),

        _links: {

            self: {

                href: `/expenses/${expense.id}`

            },

            update: {

                href: `/expenses/${expense.id}`

            },

            delete: {

                href: `/expenses/${expense.id}`

            },

            all: {

                href: "/expenses"

            }

        }

    });

}


// DESPESA CRIADA
function showCreated(res, expense) {

    res.status(201).json({

        message: "Despesa criada com sucesso",

        expense: expense.toJSON(),

        _links: {

            self: {

                href: `/expenses/${expense.id}`

            },

            all: {

                href: "/expenses"

            }

        }

    });

}


// DESPESA ATUALIZADA
function showUpdated(res, expense) {

    res.status(200).json({

        message: "Despesa atualizada com sucesso",

        expense: expense.toJSON(),

        _links: {

            self: {

                href: `/expenses/${expense.id}`

            },

            all: {

                href: "/expenses"

            }

        }

    });

}


// DESPESA REMOVIDA
function showDeleted(res) {

    res.status(200).json({

        message: "Despesa removida com sucesso",

        _links: {

            all: {

                href: "/expenses"

            }

        }

    });

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