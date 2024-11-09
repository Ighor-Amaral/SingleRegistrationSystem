const connection = require('../database');

exports.getUsers = (req, res) => {
    const sql = 'SELECT id, name, birthDate, email FROM register_users';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).json({ success: false, message: 'Erro ao buscar usuários' });
        }
        res.json({ success: true, data: results });
    });
};
