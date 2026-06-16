const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authConfig = require("../config/auth");

// Importa o model User
const User = require("../models/user");

// CADASTRAR USUÁRIO (POST)
async function createUser(req, res) {

    try {

        const { email, password, name, role } = req.body;

        // Gera o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role
        });

        // Remove a senha da resposta
        const userResponse = user.toJSON();

        delete userResponse.password;

        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: userResponse
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

// LOGIN (POST)
async function login(req, res) {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                error: "Usuário não encontrado"
            });
        }

        // Compara a senha informada com o hash salvo
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            authConfig.jwt.secret,
            {
                expiresIn: authConfig.jwt.expiresIn
            }
        );

        // Remove a senha da resposta
        const userResponse = user.toJSON();

        delete userResponse.password;

        res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: userResponse
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

module.exports = {
    createUser,
    login
};