const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

// LISTAR CATEGORIAS
router.get("/categories", categoryController.getAllCategories);

// BUSCAR CATEGORIA POR ID
router.get("/categories/:id", categoryController.getCategoryById);

// CRIAR CATEGORIA
router.post("/categories", categoryController.createCategory);

// ATUALIZAR CATEGORIA
router.put("/categories/:id", categoryController.updateCategory);

// DELETAR CATEGORIA
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;