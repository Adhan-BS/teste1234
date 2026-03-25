<?php
session_start();

//senha pika
$senha_correta = "admin123";
$erro = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($_POST['senha'] === $senha_correta) {
        $_SESSION['logado'] = true; //cria o acesso
        header("Location: index.php"); //manda para o sistema
        exit;
    } else {
        $erro = "Senha incorreta!";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Login - RoomSync</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center" style="height: 100vh;">
    <div class="card shadow p-4" style="width: 350px;">
        <h3 class="text-center mb-4">RoomSync</h3>
        
        <?php if($erro): ?>
            <div class="alert alert-danger text-center"><?= $erro ?></div>
        <?php endif; ?>

        <form method="POST">
            <div class="mb-3">
                <label>Senha de Acesso</label>
                <input type="password" name="senha" class="form-control" placeholder="Digite admin123" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Entrar no Sistema</button>
        </form>
    </div>
</body>
</html>