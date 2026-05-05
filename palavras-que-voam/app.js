// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var livroRouter = require("./src/routes/livros");
var clienteRouter = require("./src/routes/clientes");
var escolaRouter = require("./src/routes/escolas");
var pracaRouter = require("./src/routes/pracas");
var eventoRouter = require("./src/routes/eventos");
var vendaRouter = require("./src/routes/vendas");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/livros", livroRouter);
app.use("/clientes", clienteRouter);
app.use("/escolas", escolaRouter);
app.use("/pracas", pracaRouter);
app.use("/eventos", eventoRouter);
app.use("/vendas", vendaRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ########   ###    ##       ###    ##     ## ########     ###     ######      #######  ##     ## ########     ##     ##  #######     ###    ##     ## 
    ##     ## ## ##   ##      ## ##   ##     ## ##     ##   ## ##   ##    ##    ##     ## ##     ## ##           ##     ## ##     ##   ## ##   ###   ### 
    ##     ####   ##  ##     ##   ##  ##     ## ##     ##  ##   ##  ##          ##     ## ##     ## ##           ##     ## ##     ##  ##   ##  #### #### 
    ########  ##   ## ##    ##     ## ##     ## ########  ##     ##  ######     ##     ## ##     ## ######       ##     ## ##     ## ##     ## ## ### ## 
    ##        ######### ##  #########  ##   ##  ##   ##   #########       ##    ##  ## ## ##     ## ##            ##   ##  ##     ## ######### ##     ## 
    ##        ##     ## ##  ##     ##   ## ##   ##    ##  ##     ## ##    ##    ##    ##  ##     ## ##             ## ##   ##     ## ##     ## ##     ## 
    ##        ##     ## ### ##     ##    ###    ##     ## ##     ##  ######      ##### ##  #######  ########        ###     #######  ##     ## ##     ## 
    \n\n
    Servidor rodando! Acesse: http://${HOST_APP}:${PORTA_APP} \n
    Ambiente: .:${process.env.AMBIENTE_PROCESSO}:. \n`);
});
