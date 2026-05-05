var mysql = require("mysql2");

var conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function executar(instrucaoSql) {
    return new Promise(function (resolve, reject) {
        conexao.query(instrucaoSql, function (erro, resultados) {
            if (erro) {
                reject(erro);
                return;
            }
            resolve(resultados);
        });
    });
}

module.exports = { executar };
