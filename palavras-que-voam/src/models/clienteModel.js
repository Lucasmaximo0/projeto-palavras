var database = require("../database/config");

function listar() {
    console.log("ACESSEI O CLIENTE MODEL \n function listar()");
    var instrucaoSql = `
        SELECT id, nome, email, telefone FROM cliente ORDER BY nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    console.log("ACESSEI O CLIENTE MODEL \n function buscarPorId(): ", id);
    var instrucaoSql = `
        SELECT id, nome, email, telefone FROM cliente WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, telefone) {
    console.log("ACESSEI O CLIENTE MODEL \n function cadastrar(): ", nome, email, telefone);
    var instrucaoSql = `
        INSERT INTO cliente (nome, email, telefone) VALUES ('${nome}', '${email}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, nome, email, telefone) {
    console.log("ACESSEI O CLIENTE MODEL \n function editar(): ", id);
    var instrucaoSql = `
        UPDATE cliente SET nome = '${nome}', email = '${email}', telefone = '${telefone}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    console.log("ACESSEI O CLIENTE MODEL \n function deletar(): ", id);
    var instrucaoSql = `
        DELETE FROM cliente WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    editar,
    deletar
};
