class Expense {
    constructor() {
        this.expenses = [];
    }

    create({ title, amount, category, date, description }) {
        const newExpense = {
            id: "exp_" + Date.now(),
            title,
            amount,
            category,
            date,
            description,
            createdAt: new Date()
        };

        this.expenses.push(newExpense);

        return newExpense;
    }
}

module.exports = new Expense();