// Nesta etapa foi implementado o conceito de RESTful Level 3 A ideia é que a API não devolva apenas os dados,
// mas também informe quais ações o cliente pode executar através do campo "_links".

// Retorna todas as despesas
function showExpenses(res, expenses) {

    // Adiciona links de navegação em cada despesa para implementar HATEOAS (Level 3)
    const expensesWithLinks = expenses.map(expense => ({
        ...expense,

        _links: {

            // Link para acessar a própria despesa
            self: {
                href: `/expenses/${expense.id}`
            }
        }
    }));

    res.status(200).json(expensesWithLinks);
}


// Retorna total geral das despesas
function showSummaryTotal(res, total) {

    res.status(200).json({

        total,

        // Link relacionado ao recurso de despesas
        _links: {
            expenses: {
                href: '/expenses'
            }
        }
    });
}


// Retorna totais agrupados por categoria
function showSummaryByCategory(res, totalsByCategory) {

    res.status(200).json({

        totalsByCategory,

        // Link para consulta das despesas
        _links: {
            expenses: {
                href: '/expenses'
            }
        }
    });
}


// Retorna uma despesa específica
function showExpense(res, expense) {

    res.status(200).json({

        ...expense,

        // Links de navegação disponíveis
        // conforme conceito HATEOAS
        _links: {

            // Consulta da própria despesa
            self: {
                href: `/expenses/${expense.id}`
            },

            // Atualização da despesa
            update: {
                href: `/expenses/${expense.id}`
            },

            // Remoção da despesa
            delete: {
                href: `/expenses/${expense.id}`
            },

            // Lista todas as despesas
            all: {
                href: '/expenses'
            }
        }
    });
}


// Retorna resposta de criação
function showCreated(res, expense) {

    res.status(201).json({

        message: "Despesa criada com sucesso",

        expense: {
            ...expense
        },

        // Links disponíveis após criação
        _links: {

            // Consulta da despesa criada
            self: {
                href: `/expenses/${expense.id}`
            },

            // Retorna para listagem geral
            all: {
                href: '/expenses'
            }
        }
    });
}


// Retorna resposta de atualização
function showUpdated(res, expense) {

    res.status(200).json({

        message: "Despesa atualizada com sucesso",

        expense: {
            ...expense
        },

        // Links relacionados ao recurso atualizado
        _links: {

            self: {
                href: `/expenses/${expense.id}`
            },

            all: {
                href: '/expenses'
            }
        }
    });
}


// Retorna resposta de remoção
function showDeleted(res) {

    res.status(200).json({

        message: "Despesa removida com sucesso",

        // Após remover, disponibiliza link
        // para voltar à listagem principal
        _links: {

            all: {
                href: '/expenses'
            }
        }
    });
}


// Exportação das funções da View
module.exports = {
    showExpenses,
    showSummaryTotal,
    showSummaryByCategory,
    showExpense,
    showCreated,
    showUpdated,
    showDeleted
};