var database = require("../database/config");

function listar() {
    console.log("ACESSEI O ESCOLA MODEL \n function listar()");
    var instrucaoSql = `
        SELECT id, nome, cidade, estado FROM escola ORDER BY nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    console.log("ACESSEI O ESCOLA MODEL \n function buscarPorId(): ", id);
    var instrucaoSql = `
        SELECT id, nome, cidade, estado FROM escola WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, cidade, estado) {
    console.log("ACESSEI O ESCOLA MODEL \n function cadastrar(): ", nome, cidade, estado);
    var instrucaoSql = `
        INSERT INTO escola (nome, cidade, estado) VALUES ('${nome}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, nome, cidade, estado) {
    console.log("ACESSEI O ESCOLA MODEL \n function editar(): ", id);
    var instrucaoSql = `
        UPDATE escola SET nome = '${nome}', cidade = '${cidade}', estado = '${estado}' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    console.log("ACESSEI O ESCOLA MODEL \n function deletar(): ", id);
    var instrucaoSql = `
        DELETE FROM escola WHERE id = ${id};
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
