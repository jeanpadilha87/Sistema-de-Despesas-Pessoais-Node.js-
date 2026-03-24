Aluno: Jean Padilha

Sistema de Despesas Pessoais

Descrição: API REST desenvolvida em Node.js com Express para gerenciamento de despesas pessoais.

A aplicação permite:
- Cadastrar despesas
- Listar despesas 
- Buscar por ID
- Atualizar despesas
- Remover despesas 
- Calcular totais (geral e por categoria)

Tecnologias Utilizadas
-   Node.js
-   Express.js
-   JavaScript

Como executar o projeto:
npm install node src/app.js
Servidor: http://localhost:3000

Rotas da API

GET /
POST /expenses
GET /expenses
GET /expenses/:id
PUT /expenses/:id
DELETE /expenses/:id

Funcionalidades Extras

GET /expenses/summary/total
GET /expenses/summary/category

Modelo de Dados

Expense: - id - title - amount - category - date - description -createdAt

Exemplo de Requisição

{ “title”: “Supermercado”, “amount”: 150.50, “category”: “Alimentação”,
“date”: “2026-03-10”, “description”: “Compra semanal” }

Observações

-   Title obrigatório
-   Amount > 0
-   Data não pode ser futura
-   ID automático
-   Retorna 404 se não existir