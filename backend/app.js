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

server.get('/produtos/ordenados', (req, res) => {
    const sql = 'select * from PRODUTO order by nome asc';
    connection.query(sql, (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultados);
    });
});

server.get('/produtos/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'select * from produto where id_produto = ?';
    connection.query(sql, [id], (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultados);
    });
});

server.get('/produtos/busca/:nome', (req, res) => {
    const sql = 'select * from PRODUTO where nome like ?';
    const termoBusca = '%' + req.params.nome + '%';
    connection.query(sql, [termoBusca], (erro, resultados) => {
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