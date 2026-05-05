var express = require("express");
var router = express.Router();
var pracaController = require("../controllers/pracaController");

router.get("/listar", (req, res) => pracaController.listar(req, res));
router.get("/buscar/:id", (req, res) => pracaController.buscarPorId(req, res));
router.post("/cadastrar", (req, res) => pracaController.cadastrar(req, res));
router.put("/editar/:id", (req, res) => pracaController.editar(req, res));
router.delete("/deletar/:id", (req, res) => pracaController.deletar(req, res));

module.exports = router;
