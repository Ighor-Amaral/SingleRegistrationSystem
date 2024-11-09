const bcrypt = require('bcrypt');
const connection = require('../database');

exports.registerUser = async (req, res) => {
    const { name, birthDate, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO register_users (name, birthDate, email, password) VALUES (?, ?, ?, ?)';
        connection.query(sql, [name, birthDate, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Erro ao registrar usuário:', err);
                return res.status(500).json({ success: false, message: 'Erro ao registrar usuário' });
            }
            res.status(201).json({ success: true, message: 'Usuário registrado com sucesso' });
        });
    } catch (error) {
        console.error('Erro ao criptografar a senha:', error);
        res.status(500).json({ success: false, message: 'Erro ao criptografar a senha' });
    }
};
