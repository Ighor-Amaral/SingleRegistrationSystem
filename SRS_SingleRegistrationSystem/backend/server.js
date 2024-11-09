const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/'))); // Serve arquivos estáticos da pasta frontend

// Definindo rotas
app.use(registerRoutes);
app.use(loginRoutes);
app.use(userRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html')); // Corrigido
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
