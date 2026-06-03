const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

// Importa o model User
const User = require("../models/user");

// CADASTRAR USUÁRIO (POST)
async function createUser(req, res) {

    try {

        const { email, password, name, role } = req.body;

        const user = await User.create({
            email,
            password,
            name,
            role
        });

        res.status(201).json({
            message: "Usuário criado com sucesso",
            user
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

        if (user.password !== password) {
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

res.status(200).json({
    message: "Login realizado com sucesso",
    token,
    user
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