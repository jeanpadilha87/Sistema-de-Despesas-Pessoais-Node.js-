require("./config/database");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Importa os models
const { Expense, User, Category } = require("./models");

// Importa as rotas
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// Receber JSON no body das requisições
app.use(express.json());

// Sincroniza as tabelas do banco de dados
async function syncDatabase() {

    try {

        // Cria primeiro a tabela de usuários
        await User.sync();
        console.log("Tabela de usuários criada com sucesso!");

        // Cria depois a tabela de categorias
        await Category.sync();
        console.log("Tabela de categorias criada com sucesso!");

        // Por último cria a tabela de despesas
        // pois ela depende de usuários e categorias
        await Expense.sync();
        console.log("Tabela de despesas criada com sucesso!");

    } catch (err) {

        console.error("Erro ao sincronizar tabelas:", err);

    }

}

syncDatabase();

// Rota de teste
app.get("/", (req, res) => {
    res.send("API rodando!");
});

// Documentação Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Usa as rotas de despesas
app.use("/", expenseRoutes);

// Usa as rotas de usuários
app.use("/", userRoutes);

// Usa as rotas de categorias
app.use("/", categoryRoutes);

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || "Erro interno do servidor"
    });

});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});