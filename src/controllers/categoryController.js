const Category = require("../models/category");

// LISTAR CATEGORIAS
async function getAllCategories(req, res) {

    try {

        const categories = await Category.findAll();

        res.status(200).json(categories);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao buscar categorias"
        });

    }
}

// BUSCAR POR ID
async function getCategoryById(req, res) {

    try {

        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                error: "Categoria não encontrada"
            });
        }

        res.status(200).json(category);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao buscar categoria"
        });

    }
}

// CRIAR CATEGORIA
async function createCategory(req, res) {

    try {

        const { name, description } = req.body;

        const category = await Category.create({
            name,
            description
        });

        res.status(201).json(category);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao criar categoria"
        });

    }
}

// ATUALIZAR CATEGORIA
async function updateCategory(req, res) {

    try {

        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                error: "Categoria não encontrada"
            });
        }

        category.name = req.body.name;
        category.description = req.body.description;

        await category.save();

        res.status(200).json(category);

    } catch (err) {

        res.status(500).json({
            error: "Erro ao atualizar categoria"
        });

    }
}

// DELETAR CATEGORIA
async function deleteCategory(req, res) {

    try {

        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                error: "Categoria não encontrada"
            });
        }

        await category.destroy();

        res.status(204).send();

    } catch (err) {

        res.status(500).json({
            error: "Erro ao excluir categoria"
        });

    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};