var express = require("express");
var router = express.Router();
var vendaController = require("../controllers/vendaController");

router.get("/listar", (req, res) => vendaController.listar(req, res));
router.get("/buscar/:id", (req, res) => vendaController.buscarPorId(req, res));
router.get("/evento/:idEvento", (req, res) => vendaController.listarPorEvento(req, res));
router.post("/registrar", (req, res) => vendaController.registrar(req, res));
router.delete("/deletar/:id", (req, res) => vendaController.deletar(req, res));

module.exports = router;
