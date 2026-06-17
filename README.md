# Sistema de Despesas Pessoais

**Aluno:** Jean Padilha

## Descrição

API REST desenvolvida em Node.js com Express para gerenciamento de despesas pessoais.

A aplicação permite:

* Cadastrar usuários
* Realizar autenticação com JWT
* Cadastrar categorias
* Cadastrar despesas
* Listar despesas com filtros
* Buscar despesas por ID
* Atualizar despesas
* Remover despesas
* Gerar estatísticas de despesas

---

## Tecnologias Utilizadas

* Node.js
* Express.js
* Sequelize
* MySQL
* JWT (jsonwebtoken)
* bcrypt
* dotenv
* Swagger
* JavaScript

---

## Como executar o projeto

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
node src/app.js
```

Servidor:

```text
http://localhost:3000
```

Documentação Swagger:

```text
http://localhost:3000/api-docs
```

---

## Rotas da API

### Autenticação

```http
POST /users
POST /users/login
```

### Categorias

```http
GET /categories
GET /categories/:id
POST /categories
PUT /categories/:id
DELETE /categories/:id
```

### Despesas

```http
GET /expenses
GET /expenses/:id
POST /expenses
PUT /expenses/:id
DELETE /expenses/:id
```

### Dashboard

```http
GET /dashboard/total-expenses
GET /dashboard/expenses-count
GET /dashboard/expenses-by-category
```

---

## Filtros de Despesas

Exemplos:

```http
GET /expenses?status=PAGA
GET /expenses?categoryId=1
GET /expenses?startDate=2026-06-01&endDate=2026-06-30
GET /expenses?minAmount=100&maxAmount=500
```

---

## Modelo de Dados

### Usuário

* id
* name
* email
* password
* role
* createdAt
* updatedAt

### Categoria

* id
* name
* description
* createdAt
* updatedAt

### Despesa

* id
* description
* amount
* date
* status
* categoryId
* userId
* createdAt
* updatedAt

---

## Exemplo de Requisição

### Cadastro de Despesa

```json
{
  "description": "Compra no mercado",
  "amount": 150.50,
  "date": "2026-06-16",
  "status": "PENDENTE",
  "categoryId": 1,
  "userId": 1
}
```

---

## Segurança

* Autenticação com JWT
* Senhas criptografadas com bcrypt
* Variáveis de ambiente com dotenv
* Middleware de autenticação

---

## Observações

* `description` é obrigatória
* `amount` deve ser maior que zero
* `status` aceita apenas `PENDENTE` ou `PAGA`
* IDs são gerados automaticamente
* A API retorna `404` para registros não encontrados
* As rotas protegidas exigem o envio do token JWT no cabeçalho:

```text
Authorization: Bearer SEU_TOKEN
```
