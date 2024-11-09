const bcrypt = require('bcrypt');
const connection = require('../database');

exports.loginUser = (req, res) => {
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
                // Se login bem-sucedido, redireciona para a página com a lista de usuários
                res.json({ success: true, message: 'Login bem-sucedido', redirectUrl: '/users' });
            } else {
                res.status(401).json({ success: false, message: 'Email ou senha inválidos' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Email ou senha inválidos' });
        }
    });
};
