var express = require("express");
var router = express.Router();
var eventoController = require("../controllers/eventoController");

router.get("/listar", (req, res) => eventoController.listar(req, res));
router.get("/buscar/:id", (req, res) => eventoController.buscarPorId(req, res));
router.post("/cadastrar", (req, res) => eventoController.cadastrar(req, res));
router.put("/editar/:id", (req, res) => eventoController.editar(req, res));
router.delete("/deletar/:id", (req, res) => eventoController.deletar(req, res));

module.exports = router;
