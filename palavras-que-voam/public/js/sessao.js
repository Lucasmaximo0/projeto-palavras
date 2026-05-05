// ── Sessão do usuário ──

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        if (b_usuario) b_usuario.innerHTML = nome;
    } else {
        window.location = "/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/login.html";
}

// ── Loading ──

function aguardar() {
    var div = document.getElementById("div_aguardar");
    if (div) div.style.display = "flex";
}

function finalizarAguardar(texto) {
    var div = document.getElementById("div_aguardar");
    if (div) div.style.display = "none";

    var divErros = document.getElementById("div_erros_login");
    if (divErros && texto) {
        divErros.style.display = "block";
        divErros.innerHTML = texto;
    }
}

// ── Toast de alerta ──

function mostrarToast(mensagem, tipo) {
    var card = document.getElementById("cardErro");
    var span = document.getElementById("mensagem_erro");
    if (!card || !span) return;

    span.innerHTML = mensagem;
    card.style.display = "block";
    card.style.borderLeftColor = tipo === "sucesso" ? "#2e7d32" : "#F7941D";

    setTimeout(function () {
        card.style.display = "none";
    }, 4000);
}

function limparFormulario(formId) {
    var form = document.getElementById(formId);
    if (form) form.reset();
}
