<?php
//conexao.php
try {
    //cria um arquivo chamado 'banco.sqlite' na mesma pasta do projeto
    $pdo = new PDO('sqlite:' . __DIR__ . '/banco.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    //cria a tabela de reservas se ela ainda não existir
    $pdo->exec("CREATE TABLE IF NOT EXISTS reservas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        sala TEXT,
        data TEXT,
        horaInicio TEXT,
        horaFim TEXT,
        status TEXT
    )");
} catch (PDOException $e) {
    die("Erro de conexão com SQLite: " . $e->getMessage());
}
?>