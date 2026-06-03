const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Cadastro de usuário
router.post("/users", userController.createUser);

// Login de usuário
router.post("/users/login", userController.login);

module.exports = router;