const User = require("./user");
const Expense = require("./expense");
const Category = require("./category");

// Um usuário possui várias despesas
User.hasMany(Expense, {
    foreignKey: "userId"
});

// Uma despesa pertence a um usuário
Expense.belongsTo(User, {
    foreignKey: "userId"
});

// Uma categoria possui várias despesas
Category.hasMany(Expense, {
    foreignKey: "categoryId"
});

// Uma despesa pertence a uma categoria
Expense.belongsTo(Category, {
    foreignKey: "categoryId"
});

module.exports = {
    User,
    Expense,
    Category
};