var express = require("express");
var router = express.Router();
var escolaController = require("../controllers/escolaController");

router.get("/listar", (req, res) => escolaController.listar(req, res));
router.get("/buscar/:id", (req, res) => escolaController.buscarPorId(req, res));
router.post("/cadastrar", (req, res) => escolaController.cadastrar(req, res));
router.put("/editar/:id", (req, res) => escolaController.editar(req, res));
router.delete("/deletar/:id", (req, res) => escolaController.deletar(req, res));

module.exports = router;
