const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

// Middleware de autenticação e autorização utilizando JWT
module.exports = function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Token não informado"
        });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            error: "Token mal formatado"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            authConfig.jwt.secret
        );

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        return next();

    } catch (err) {

        return res.status(401).json({
            error: "Token inválido ou expirado"
        });

    }
};