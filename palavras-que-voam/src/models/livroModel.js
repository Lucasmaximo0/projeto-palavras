var database = require("../database/config");

function listar() {
    console.log("ACESSEI O LIVRO MODEL \n function listar()");
    var instrucaoSql = `
        SELECT id, titulo, autor, isbn, idade_indicada, genero, quantidade_estoque
        FROM livro
        ORDER BY titulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    console.log("ACESSEI O LIVRO MODEL \n function buscarPorId(): ", id);
    var instrucaoSql = `
        SELECT id, titulo, autor, isbn, idade_indicada, genero, quantidade_estoque
        FROM livro
        WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarPorTitulo(titulo) {
    console.log("ACESSEI O LIVRO MODEL \n function pesquisarPorTitulo(): ", titulo);
    var instrucaoSql = `
        SELECT id, titulo, autor, isbn, idade_indicada, genero, quantidade_estoque
        FROM livro
        WHERE titulo LIKE '%${titulo}%'
        ORDER BY titulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(titulo, autor, isbn, idadeIndicada, genero, quantidadeEstoque) {
    console.log("ACESSEI O LIVRO MODEL \n function cadastrar(): ", titulo, autor);
    var instrucaoSql = `
        INSERT INTO livro (titulo, autor, isbn, idade_indicada, genero, quantidade_estoque)
        VALUES ('${titulo}', '${autor}', '${isbn}', ${idadeIndicada}, '${genero}', ${quantidadeEstoque});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(id, titulo, autor, isbn, idadeIndicada, genero, quantidadeEstoque) {
    console.log("ACESSEI O LIVRO MODEL \n function editar(): ", id);
    var instrucaoSql = `
        UPDATE livro
        SET titulo = '${titulo}', autor = '${autor}', isbn = '${isbn}',
            idade_indicada = ${idadeIndicada}, genero = '${genero}', quantidade_estoque = ${quantidadeEstoque}
        WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    console.log("ACESSEI O LIVRO MODEL \n function deletar(): ", id);
    var instrucaoSql = `
        DELETE FROM livro WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarEstoque(id, quantidade) {
    console.log("ACESSEI O LIVRO MODEL \n function atualizarEstoque(): ", id, quantidade);
    var instrucaoSql = `
        UPDATE livro SET quantidade_estoque = quantidade_estoque + ${quantidade} WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarPorId,
    pesquisarPorTitulo,
    cadastrar,
    editar,
    deletar,
    atualizarEstoque
};
