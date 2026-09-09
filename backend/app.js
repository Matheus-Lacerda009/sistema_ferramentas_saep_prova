//Importa os pacotes principais do Node.js
const express = require('express');
const cors = require('cors');
const connection = require('./db');

//Inicializa a aplicação Express
const server = express();

//Habilita o CORS
server.use(cors());

//Configura o Express para interpretar requisições
server.use(express.json());

server.get('/produtos', (req, res) => {
    const sql = 'select * from PRODUTO';
    connection.query(sql, (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultados);
    });
});

const PORT = 3025;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});