<?php
//pega a conexão com o banco SQLite
require_once 'conexao.php';

//formata para JSON
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

//lista reservas (GET)
if ($method === 'GET') {
    // Pega todas as reservas ordenadas pela data
    $stmt = $pdo->query("SELECT * FROM reservas ORDER BY data, horaInicio");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

//cria reserva (POST)
if ($method === 'POST') {
    $sala = $input['sala'];
    $data = $input['data'];
    $horaInicio = $input['horaInicio'];
    $horaFim = $input['horaFim'];
    $nome = $input['nome'];

    //Regra de conflito
    $sqlConflito = "SELECT id FROM reservas 
                    WHERE sala = ? AND data = ? AND status = 'ativa' 
                    AND (horaInicio < ? AND horaFim > ?)";
    $stmt = $pdo->prepare($sqlConflito);
    //logistica de tempo
    $stmt->execute([$sala, $data, $horaFim, $horaInicio]);
    
    if ($stmt->fetch()) {
        http_response_code(409); //retorna erro de conflito
        echo json_encode(['erro' => 'Erro: Esta sala já está reservada nesse horário!']);
        exit;
    }

    //se a sala tiver livre salva no banco
    $sqlInsert = "INSERT INTO reservas (nome, sala, data, horaInicio, horaFim, status) 
                  VALUES (?, ?, ?, ?, ?, 'ativa')";
    $stmt = $pdo->prepare($sqlInsert);
    $stmt->execute([$nome, $sala, $data, $horaInicio, $horaFim]);
    
    http_response_code(201); //suceso yupiii!!!
    echo json_encode(['mensagem' => 'Reserva criada com sucesso']);
    exit;
}

//cancela reserva (PUT)
if ($method === 'PUT') {
    $id = $input['id'];
    //atualiza o status para 'cancelada' em vez de apagar do banco (mantém histórico)
    $stmt = $pdo->prepare("UPDATE reservas SET status = 'cancelada' WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['mensagem' => 'Reserva cancelada com sucesso']);
    exit;
}
?>