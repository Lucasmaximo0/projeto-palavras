var eventoModel = require("../models/eventoModel");

function listar(req, res) {
    eventoModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum evento encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar os eventos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    eventoModel.buscarPorId(id)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Evento não encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o evento: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var dataEvento = req.body.dataEvento;
    var tipoLocal = req.body.tipoLocal;
    var escolaId = req.body.escolaId || null;
    var pracaId = req.body.pracaId || null;

    if (nome == undefined) {
        res.status(400).send("O nome do evento está undefined!");
    } else if (dataEvento == undefined) {
        res.status(400).send("A data do evento está undefined!");
    } else if (tipoLocal == undefined) {
        res.status(400).send("O tipo de local está undefined!");
    } else if (tipoLocal === 'escola' && escolaId == null) {
        res.status(400).send("O id da escola está undefined!");
    } else if (tipoLocal === 'praca' && pracaId == null) {
        res.status(400).send("O id da praça está undefined!");
    } else {
        eventoModel.cadastrar(nome, dataEvento, tipoLocal, escolaId, pracaId)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao cadastrar o evento: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function editar(req, res) {
    var id = req.params.id;
    var nome = req.body.nome;
    var dataEvento = req.body.dataEvento;
    var tipoLocal = req.body.tipoLocal;
    var escolaId = req.body.escolaId || null;
    var pracaId = req.body.pracaId || null;

    if (nome == undefined) {
        res.status(400).send("O nome do evento está undefined!");
    } else {
        eventoModel.editar(id, nome, dataEvento, tipoLocal, escolaId, pracaId)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar o evento: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletar(req, res) {
    var id = req.params.id;

    eventoModel.deletar(id)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar o evento: ", erro.sqlMessage);
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
