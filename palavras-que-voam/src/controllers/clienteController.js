var clienteModel = require("../models/clienteModel");

function listar(req, res) {
    clienteModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum cliente encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar os clientes: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    clienteModel.buscarPorId(id)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Cliente não encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o cliente: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;

    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else {
        clienteModel.cadastrar(nome, email, telefone)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao cadastrar o cliente: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function editar(req, res) {
    var id = req.params.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var telefone = req.body.telefone;

    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else {
        clienteModel.editar(id, nome, email, telefone)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar o cliente: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletar(req, res) {
    var id = req.params.id;

    clienteModel.deletar(id)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar o cliente: ", erro.sqlMessage);
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
