var vendaModel = require("../models/vendaModel");
var livroModel = require("../models/livroModel");

function listar(req, res) {
    vendaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma venda encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar as vendas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var id = req.params.id;

    vendaModel.buscarPorId(id)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // busca também os itens da venda
                return vendaModel.buscarItensPorVenda(id).then(function (itens) {
                    var venda = resultado[0];
                    venda.itens = itens;
                    res.status(200).json(venda);
                });
            } else {
                res.status(404).send("Venda não encontrada!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a venda: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPorEvento(req, res) {
    var idEvento = req.params.idEvento;

    vendaModel.listarPorEvento(idEvento)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma venda encontrada para este evento!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar vendas por evento: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function registrar(req, res) {
    // Espera receber: { clienteId, eventoId, itens: [{livroId, quantidade, precoUnitario}] }
    var clienteId = req.body.clienteId || null;
    var eventoId = req.body.eventoId;
    var itens = req.body.itens;

    if (eventoId == undefined) {
        res.status(400).send("O id do evento está undefined!");
    } else if (itens == undefined || itens.length == 0) {
        res.status(400).send("Os itens da venda estão undefined ou vazios!");
    } else {
        // Calcula o valor total
        var valorTotal = itens.reduce(function (soma, item) {
            return soma + (item.quantidade * item.precoUnitario);
        }, 0);

        vendaModel.registrar(clienteId, eventoId, valorTotal)
            .then(function (resultadoVenda) {
                var idVenda = resultadoVenda.insertId;

                // Insere cada item e atualiza o estoque
                var promessas = itens.map(function (item) {
                    return vendaModel.adicionarItem(idVenda, item.livroId, item.quantidade, item.precoUnitario)
                        .then(function () {
                            // Desconta do estoque (quantidade negativa)
                            return livroModel.atualizarEstoque(item.livroId, -item.quantidade);
                        });
                });

                return Promise.all(promessas).then(function () {
                    res.status(201).json({ idVenda: idVenda, valorTotal: valorTotal });
                });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao registrar a venda: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletar(req, res) {
    var id = req.params.id;

    vendaModel.deletar(id)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar a venda: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    buscarPorId,
    listarPorEvento,
    registrar,
    deletar
};
