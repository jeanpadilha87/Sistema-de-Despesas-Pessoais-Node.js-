require('dotenv').config();

// Configurações do JWT
// Alterado para implementar autenticação/autorização com JWT
module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'despesas-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
};