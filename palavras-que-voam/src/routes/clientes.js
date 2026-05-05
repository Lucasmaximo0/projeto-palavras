var express = require("express");
var router = express.Router();
var clienteController = require("../controllers/clienteController");

router.get("/listar", (req, res) => clienteController.listar(req, res));
router.get("/buscar/:id", (req, res) => clienteController.buscarPorId(req, res));
router.post("/cadastrar", (req, res) => clienteController.cadastrar(req, res));
router.put("/editar/:id", (req, res) => clienteController.editar(req, res));
router.delete("/deletar/:id", (req, res) => clienteController.deletar(req, res));

module.exports = router;
