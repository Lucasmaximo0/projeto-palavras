-- ============================================================
-- BANCO DE DADOS: Palavras que Voam
-- Sistema de gestão de vendas, estoque e doações de livros
-- ============================================================

CREATE DATABASE IF NOT EXISTS palavras_que_voam;
USE palavras_que_voam;

-- Tabela: usuario
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Tabela: livro
CREATE TABLE IF NOT EXISTS livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    isbn VARCHAR(20),
    idade_indicada INT,
    genero VARCHAR(50),
    quantidade_estoque INT NOT NULL DEFAULT 0
);

-- Tabela: cliente
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20)
);

-- Tabela: escola
CREATE TABLE IF NOT EXISTS escola (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(100),
    estado VARCHAR(50)
);

-- Tabela: praca
CREATE TABLE IF NOT EXISTS praca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(100),
    estado VARCHAR(50)
);

-- Tabela: evento
CREATE TABLE IF NOT EXISTS evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_evento DATE NOT NULL,
    tipo_local ENUM('escola', 'praca') NOT NULL,
    escola_id INT,
    praca_id INT,
    FOREIGN KEY (escola_id) REFERENCES escola(id),
    FOREIGN KEY (praca_id) REFERENCES praca(id)
);

-- Tabela: venda
CREATE TABLE IF NOT EXISTS venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    evento_id INT NOT NULL,
    data_venda DATETIME DEFAULT NOW(),
    valor_total DECIMAL(10,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (evento_id) REFERENCES evento(id)
);

-- Tabela: item_venda
CREATE TABLE IF NOT EXISTS item_venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venda_id INT NOT NULL,
    livro_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES venda(id),
    FOREIGN KEY (livro_id) REFERENCES livro(id)
);
