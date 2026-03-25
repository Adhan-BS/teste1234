// LISTAR
function listarReservas() {
  //faz um get real no api.php
  fetch("api.php")
    .then((res) => res.json())
    .then((dados) => {
      const ul = document.getElementById("listaReservas");
      ul.innerHTML = "";

      if (dados.length === 0) {
        ul.innerHTML =
          '<li class="list-group-item text-muted text-center">Nenhuma reserva encontrada no momento.</li>';
        return;
      }

      dados.forEach((item) => {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";

        let texto = `<strong>${item.sala}</strong> - ${item.data} das ${item.horaInicio} às ${item.horaFim} (por ${item.nome})`;

        if (item.status === "cancelada") {
          texto = `<del class="text-muted">${texto}</del> <span class="badge bg-danger rounded-pill">Cancelada</span>`;
        } else {
          texto += `<button class="btn btn-sm btn-outline-danger" onclick="cancelarReserva(${item.id})">Cancelar</button>`;
        }

        li.innerHTML = texto;
        ul.appendChild(li);
      });
    });
}

//adicionar
function adicionarReserva() {
  const nome = document.getElementById("nomeUsuario").value;
  const sala = document.getElementById("salaSelect").value;
  const data = document.getElementById("dataReserva").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFim = document.getElementById("horaFim").value;

  if (!nome || !sala || !data || !horaInicio || !horaFim) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  if (horaInicio >= horaFim) {
    alert("Erro: A hora de início deve ser menor que a hora de término!");
    return;
  }

  //faz um POST real no php mandando os dados em JSON
  fetch("api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, sala, data, horaInicio, horaFim }),
  }).then((res) => {
    if (res.status === 409) {
      res.json().then((dadosErro) => alert(dadosErro.erro));
    } else if (res.status === 201) {
      //limpa o formulário
      document.getElementById("nomeUsuario").value = "";
      document.getElementById("dataReserva").value = "";
      document.getElementById("horaInicio").value = "";
      document.getElementById("horaFim").value = "";

      listarReservas(); //atualiza a tela
    }
  });
}

//cancelar
function cancelarReserva(id) {
  if (confirm("Tem certeza que deseja cancelar esta reserva?")) {
    //faz um PUT no php mandando o id de quem vai ser cancelado
    fetch("api.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    }).then(() => listarReservas());
  }
}

//carrega as reservas quando a tela abre
window.onload = listarReservas;
