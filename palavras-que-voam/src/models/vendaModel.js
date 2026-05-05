var database = require("../database/config");

function listar() {
    console.log("ACESSEI O VENDA MODEL \n function listar()");
    var instrucaoSql = `
        SELECT 
            v.id AS idVenda,
            v.data_venda,
            v.valor_total,
            c.id AS idCliente,
            c.nome AS nomeCliente,
            e.id AS idEvento,
            e.nome AS nomeEvento,
            e.data_evento
        FROM venda v
            LEFT JOIN cliente c ON v.cliente_id = c.id
            INNER JOIN evento e ON v.evento_id = e.id
        ORDER BY v.data_venda DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    console.log("ACESSEI O VENDA MODEL \n function buscarPorId(): ", id);
    var instrucaoSql = `
        SELECT 
            v.id AS idVenda,
            v.data_venda,
            v.valor_total,
            c.id AS idCliente,
            c.nome AS nomeCliente,
            e.id AS idEvento,
            e.nome AS nomeEvento
        FROM venda v
            LEFT JOIN cliente c ON v.cliente_id = c.id
            INNER JOIN evento e ON v.evento_id = e.id
        WHERE v.id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarItensPorVenda(idVenda) {
    console.log("ACESSEI O VENDA MODEL \n function buscarItensPorVenda(): ", idVenda);
    var instrucaoSql = `
        SELECT 
            iv.id AS idItem,
            iv.quantidade,
            iv.preco_unitario,
            (iv.quantidade * iv.preco_unitario) AS subtotal,
            l.id AS idLivro,
            l.titulo,
            l.autor
        FROM item_venda iv
            INNER JOIN livro l ON iv.livro_id = l.id
        WHERE iv.venda_id = ${idVenda};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorEvento(idEvento) {
    console.log("ACESSEI O VENDA MODEL \n function listarPorEvento(): ", idEvento);
    var instrucaoSql = `
        SELECT 
            v.id AS idVenda,
            v.data_venda,
            v.valor_total,
            c.nome AS nomeCliente
        FROM venda v
            LEFT JOIN cliente c ON v.cliente_id = c.id
        WHERE v.evento_id = ${idEvento}
        ORDER BY v.data_venda DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrar(clienteId, eventoId, valorTotal) {
    console.log("ACESSEI O VENDA MODEL \n function registrar(): ", clienteId, eventoId, valorTotal);
    var instrucaoSql = `
        INSERT INTO venda (cliente_id, evento_id, valor_total)
        VALUES (${clienteId || 'NULL'}, ${eventoId}, ${valorTotal});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarItem(vendaId, livroId, quantidade, precoUnitario) {
    console.log("ACESSEI O VENDA MODEL \n function adicionarItem(): ", vendaId, livroId, quantidade, precoUnitario);
    var instrucaoSql = `
        INSERT INTO item_venda (venda_id, livro_id, quantidade, preco_unitario)
        VALUES (${vendaId}, ${livroId}, ${quantidade}, ${precoUnitario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    console.log("ACESSEI O VENDA MODEL \n function deletar(): ", id);
    var instrucaoSql = `
        DELETE FROM item_venda WHERE venda_id = ${id};
    `;
    return database.executar(instrucaoSql).then(function () {
        var instrucaoSql2 = `DELETE FROM venda WHERE id = ${id};`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql2);
        return database.executar(instrucaoSql2);
    });
}

module.exports = {
    listar,
    buscarPorId,
    buscarItensPorVenda,
    listarPorEvento,
    registrar,
    adicionarItem,
    deletar
};
