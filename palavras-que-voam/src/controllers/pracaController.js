var pracaModel = require("../models/pracaModel");

function listar(req, res) {
    pracaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma praça encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar as praças: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    pracaModel.buscarPorId(id)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Praça não encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a praça: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var cidade = req.body.cidade;
    var estado = req.body.estado;

    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else {
        pracaModel.cadastrar(nome, cidade, estado)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao cadastrar a praça: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function editar(req, res) {
    var id = req.params.id;
    var nome = req.body.nome;
    var cidade = req.body.cidade;
    var estado = req.body.estado;

    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else {
        pracaModel.editar(id, nome, cidade, estado)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar a praça: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletar(req, res) {
    var id = req.params.id;

    pracaModel.deletar(id)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar a praça: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    editar,
    deletar
};
