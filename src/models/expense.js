// Classe paragerenciar as despesas
class Expense {

    // Construtor: inicializa o array e o contador de ID
    constructor() {
        this.expenses = [];      // Array que armazena todas as despesas
        this.idCounter = 1;      // Contador automático para gerar IDs
    }

    // Retorna todas as despesas cadastradas
    getAll() {
        return this.expenses;
    }

    // Busca uma despesa pelo ID
    getById(id) {
        return this.expenses.find(e => e.id === id);
    }

    // Cria uma nova despesa
    create(title, amount, category, date, description) {

        // Cria o objeto da despesa
        const newExpense = {
            id: this.idCounter++, // Incrementa automaticamente o ID
            title,
            amount,
            category,
            date,
            description
        };

        // Adiciona no array
        this.expenses.push(newExpense);

        // Retorna a despesa criada
        return newExpense;
    }

    //total geral
    getTotal() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    //totais por categoria
    getTotalByCategory() {
        return this.expenses.reduce((totals, expense) => {
            const category = expense.category;

            if (!totals[category]) {
                totals[category] = 0;
            }

            totals[category] += expense.amount;

            return totals;
        }, {});
    }

    // Atualiza uma despesa existente
    update(id, title, amount, category, date, description) {

        // Procura o índice da despesa
        const index = this.expenses.findIndex(e => e.id === id);

        // Se não encontrar, retorna null
        if (index === -1) {
            return null;
        }

        // Atualiza os dados mantendo o que já existia
        this.expenses[index] = {
            ...this.expenses[index],
            title,
            amount,
            category,
            date,
            description
        };

        // Retorna a despesa atualizada
        return this.expenses[index];
    }

    // Remove uma despesa pelo ID
    delete(id) {

        const index = this.expenses.findIndex(e => e.id === id);

        if (index === -1) {
            return null;
        }

        // Remove do array
        this.expenses.splice(index, 1);
    }
}

// Exporta a classe para uso em outros arquivos
module.exports = new Expense();
