var livroModel = require("../models/livroModel");

function listar(req, res) {
    livroModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum livro encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar os livros: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    livroModel.buscarPorId(id)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Livro não encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o livro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function pesquisarPorTitulo(req, res) {
    var titulo = req.params.titulo;

    livroModel.pesquisarPorTitulo(titulo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao pesquisar livros: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var titulo = req.body.titulo;
    var autor = req.body.autor;
    var isbn = req.body.isbn;
    var idadeIndicada = req.body.idadeIndicada;
    var genero = req.body.genero;
    var quantidadeEstoque = req.body.quantidadeEstoque;

    if (titulo == undefined) {
        res.status(400).send("O título está undefined!");
    } else if (autor == undefined) {
        res.status(400).send("O autor está undefined!");
    } else if (quantidadeEstoque == undefined) {
        res.status(400).send("A quantidade em estoque está undefined!");
    } else {
        livroModel.cadastrar(titulo, autor, isbn, idadeIndicada, genero, quantidadeEstoque)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao cadastrar o livro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function editar(req, res) {
    var id = req.params.id;
    var titulo = req.body.titulo;
    var autor = req.body.autor;
    var isbn = req.body.isbn;
    var idadeIndicada = req.body.idadeIndicada;
    var genero = req.body.genero;
    var quantidadeEstoque = req.body.quantidadeEstoque;

    if (titulo == undefined) {
        res.status(400).send("O título está undefined!");
    } else if (autor == undefined) {
        res.status(400).send("O autor está undefined!");
    } else {
        livroModel.editar(id, titulo, autor, isbn, idadeIndicada, genero, quantidadeEstoque)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar o livro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletar(req, res) {
    var id = req.params.id;

    livroModel.deletar(id)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar o livro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    buscarPorId,
    pesquisarPorTitulo,
    cadastrar,
    editar,
    deletar
};
