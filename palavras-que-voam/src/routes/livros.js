var express = require("express");
var router = express.Router();
var livroController = require("../controllers/livroController");

router.get("/listar", (req, res) => livroController.listar(req, res));
router.get("/buscar/:id", (req, res) => livroController.buscarPorId(req, res));
router.get("/pesquisar/:titulo", (req, res) => livroController.pesquisarPorTitulo(req, res));
router.post("/cadastrar", (req, res) => livroController.cadastrar(req, res));
router.put("/editar/:id", (req, res) => livroController.editar(req, res));
router.delete("/deletar/:id", (req, res) => livroController.deletar(req, res));

module.exports = router;
