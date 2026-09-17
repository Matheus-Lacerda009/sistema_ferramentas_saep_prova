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

server.post('/produtos' , (req, res) => {
    const { nome, cor, textura, peso, 
        unidade_medida, aplicacao, 
        data_validade, estoque_minimo, 
        estoque_atual, preco_unitario, id_categoria
    } = req.body;

    if (nome == null || cor == null || textura == null || peso == null
         || unidade_medida == null || aplicacao == null || data_validade == null 
         || estoque_minimo == null || estoque_atual == null || preco_unitario == null || id_categoria == null) {
        
            return res.status(400).json({erro: 'Todos os campos são obrigatórios'});
    }

    const sql = `INSERT INTO PRODUTO (nome, cor, textura, peso, unidade_medida, aplicacao, 
                                        data_validade, estoque_minimo, estoque_atual, preco_unitario, 
                                        id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query( sql, [nome, cor, textura, peso, unidade_medida, aplicacao, 
                            data_validade, estoque_minimo, estoque_atual, preco_unitario, id_categoria], (erro, resultado) => {
            
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        res.json({
            mensagem: 'Produto cadastrado com sucesso', 
            id_produto: resultado.insertId
        });
    });
});

server.put('/produtos/:id', (req, res) => {
    const {nome, cor, textura, peso, unidade_medida,
        aplicacao, data_validade, estoque_minimo, estoque_atual,
        preco_unitario, id_categoria} = req.body;

    const sql = `update PRODUTO set nome = ?, cor = ?, textura = ?, peso = ?, unidade_medida = ?, aplicacao = ?, data_validade = ?,
                estoque_minimo = ?, estoque_atual = ?, preco_unitario = ?, id_categoria = ? where id_produto = ?`;
    
    const {id} = req.params;

    connection.query(sql, [nome, cor, textura, peso, unidade_medida,
        aplicacao, data_validade, estoque_minimo, estoque_atual,
        preco_unitario, id_categoria, id], (erro) => {
            if(erro){
                return res.status(500).json({erro: erro.message});
            }
            return res.json({
                mensagem: 'Produto atualizado com sucesso'
            });
        });

});

server.delete('/produtos/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'delete from PRODUTO where id_produto = ?';
    connection.query(sql, [id], (erro) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json({mensagem : "Produto removido com sucesso"});
    });
});

const PORT = 3025;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});