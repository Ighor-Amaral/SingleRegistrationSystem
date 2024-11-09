const express = require('express');
const { getUsers } = require('../controllers/userController.js');
const connection = require('../database');

const router = express.Router();

// Rota existente para buscar a lista de usuários
router.get('/users', getUsers);

// Adicionando a rota para lidar com o redirecionamento após login bem-sucedido
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM register_users WHERE email = ?';
    connection.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ success: false, message: 'Erro ao fazer login' });
        }

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Login bem-sucedido: retorna um JSON que inclui a URL de redirecionamento
                res.json({ success: true, message: 'Login bem-sucedido', redirectUrl: '/users' });
            } else {
                res.status(401).json({ success: false, message: 'Email ou senha inválidos' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Email ou senha inválidos' });
        }
    });
});

module.exports = router;
