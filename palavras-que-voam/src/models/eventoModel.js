var database = require("../database/config");

function listar() {
    console.log("ACESSEI O EVENTO MODEL \n function listar()");
    var instrucaoSql = `
        SELECT 
            e.id,
            e.nome,
            e.data_evento,
            e.tipo_local,
            e.escola_id,
            e.praca_id,
            esc.nome AS nome_escola,
            prc.nome AS nome_praca
        FROM evento e
            LEFT JOIN escola esc ON e.escola_id = esc.id
            LEFT JOIN praca prc ON e.praca_id = prc.id
        ORDER BY e.data_evento DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    console.log("ACESSEI O EVENTO MODEL \n function buscarPorId(): ", id);
    var instrucaoSql = `
        SELECT 
            e.id,
            e.nome,
            e.data_evento,
            e.tipo_local,
            e.escola_id,
            e.praca_id,
            esc.nome AS nome_escola,
            prc.nome AS nome_praca
        FROM evento e
            LEFT JOIN escola esc ON e.escola_id = esc.id
            LEFT JOIN praca prc ON e.praca_id = prc.id
        WHERE e.id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, dataEvento, tipoLocal, escolaId, pracaId) {
    console.log("ACESSEI O EVENTO MODEL \n function cadastrar(): ", nome, dataEvento, tipoLocal);
    var instrucaoSql = `
        INSERT INTO evento (nome, data_evento, tipo_local, escola_id, praca_id)
        VALUES ('${nome}', '${dataEvento}', '${tipoLocal}', ${escolaId || 'NULL'}, ${pracaId || 'NULL'});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, nome, dataEvento, tipoLocal, escolaId, pracaId) {
    console.log("ACESSEI O EVENTO MODEL \n function editar(): ", id);
    var instrucaoSql = `
        UPDATE evento
        SET nome = '${nome}', data_evento = '${dataEvento}', tipo_local = '${tipoLocal}',
            escola_id = ${escolaId || 'NULL'}, praca_id = ${pracaId || 'NULL'}
        WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    console.log("ACESSEI O EVENTO MODEL \n function deletar(): ", id);
    var instrucaoSql = `
        DELETE FROM evento WHERE id = ${id};
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
