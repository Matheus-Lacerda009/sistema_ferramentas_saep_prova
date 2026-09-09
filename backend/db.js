const mysql = require('mysql2');

//Cria a conexão com o bando de dados MySQL com as credenciais de acesso
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'saep_db'
});

//Tenta realizar a conexão com o banco
connection.connect((erro) => {
    if(erro){
        console.log('Erro ao conectar ao Banco de Dados:', erro);
        return;
    }
    console.log('Banco de Dados saep_db conectado com sucesso!');
});

//Exporta a variável connection para ser usada no app.js
module.exports = connection;