//Simulação de API
//Variavel de lista, ela zera quando a pagina atualiza ela zera
let reservas = [];

//Funcao que imita um servidor recebendo requisições
function api(method, endpoint, body = null) {
  return new Promise((resolve) => {
    if (method === "GET" && endpoint === "/reservas") {
      //GET o cliente quiser LER todas as reservas
      resolve({
        status: 200,
        json: () => Promise.resolve(reservas),
      });
    }

    //Post o cliente quer CRIAR uma nova reserva
    if (method === "POST" && endpoint === "/reservas") {
      // Procura na lista se já existe uma reserva ativa na mesma sala
      const conflito = reservas.find(
        (r) =>
          r.sala === body.sala &&
          r.data === body.data &&
          r.status === "ativa" &&
          body.horaInicio < r.horaFim &&
          body.horaFim > r.horaInicio,
      );

      //Se achou um conflito e mostra erro 409
      if (conflito) {
        resolve({
          status: 409,
          json: () =>
            Promise.resolve({
              erro: "Erro: Esta sala já está reservada nesse horário!",
            }),
        });
        return;
      } //Para aqui

      //Se deu certo monta o objeto da nova reserva
      const nova = {
        id: reservas.length + 1,
        nome: body.nome,
        sala: body.sala,
        data: body.data,
        horaInicio: body.horaInicio,
        horaFim: body.horaFim,
        status: "ativa",
      };

      //Salva variável "banco de dados"
      reservas.push(nova);

      //Responde pro usuario que foi Criado
      resolve({
        status: 201,
        json: () => Promise.resolve(nova),
      });
    }

    //PUT o cliente quer cancelar
    if (method === "PUT" && endpoint.startsWith("/reservas/cancelar/")) {
      const id = parseInt(endpoint.split("/").pop());
      const reserva = reservas.find((r) => r.id === id);

      //Descobre o ID da reserva olhando para o endpoint
      if (reserva) {
        reserva.status = "cancelada";
      }
      //Acha a reserva na lista e muda o status dela
      resolve({ status: 200, json: () => Promise.resolve(reserva) });
    }
  });
}

//Parte do Front-end, já deu 33 erros contados AAAHHH

//Funcao que mostra a reservas na tela
function listarReservas() {
  //Pede os dados pra API simulada
  api("GET", "/reservas")
    .then((r) => r.json())
    .then((dados) => {
      const ul = document.getElementById("listaReservas");
      ul.innerHTML = ""; //Limpa a tela velha antes de desenhar a nova

      //Se o banco estiver vazio mostra sucesso
      if (dados.length === 0) {
        ul.innerHTML =
          '<li class="list-group-item text-muted text-center">Nenhuma reserva encontrada no momento.</li>';
        return;
      }

      //Se tiver dados verica um por um
      dados.forEach((item) => {
        //Cria um elemento de lista pro HTML
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";

        //Monta o texto que vai aparecer
        let texto = `<strong>${item.sala}</strong> - ${item.data} das ${item.horaInicio} às ${item.horaFim} (por ${item.nome})`;

        //Se a reserva foi cancelada fica riscada. Mas se nao foi mostra o botao de cancelar.
        if (item.status === "cancelada") {
          texto = `<del class="text-muted">${texto}</del> <span class="badge bg-danger rounded-pill">Cancelada</span>`;
        } else {
          texto += `<button class="btn btn-sm btn-outline-danger" onclick="cancelarReserva(${item.id})">Cancelar</button>`;
        }

        //Injeta o texto dentro do <li>, e joga o <li> lá pro HTML (<ul id="listaReservas">)
        li.innerHTML = texto;
        ul.appendChild(li);
      });
    });
}

//Funcao para cadastrar nova reserva
function adicionarReserva() {
  //Pega os valores que o usuario digitou nas caixinhas do HTML
  const nome = document.getElementById("nomeUsuario").value;
  const sala = document.getElementById("salaSelect").value;
  const data = document.getElementById("dataReserva").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFim = document.getElementById("horaFim").value;

  //Confere se o cara não deixou nada em branco
  if (!nome || !sala || !data || !horaInicio || !horaFim) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  //Verifica se a hora de inicio nao é maior que a hora do fim
  if (horaInicio >= horaFim) {
    alert("Erro: A hora de início deve ser menor que a hora de término!");
    return;
  }

  //Manda os dados pra API simulada salvar
  api("POST", "/reservas", { nome, sala, data, horaInicio, horaFim }).then(
    (r) => {
      //Se tiver conflito de horaripo com a API mostra o erro
      if (r.status === 409) {
        r.json().then((dadosErro) => alert(dadosErro.erro));
      }

      //Se a API aceitar deu bom
      else if (r.status === 201) {
        document.getElementById("nomeUsuario").value = "";
        document.getElementById("dataReserva").value = "";
        document.getElementById("horaInicio").value = "";
        document.getElementById("horaFim").value = "";

        // Limpa os campos do formulário para a próxima reserva
        listarReservas();
      }
    },
  );
}

//Funcao cancelamento
function cancelarReserva(id) {
  //Abre uma caixinha pra confirmar o cancelamento
  if (confirm("Tem certeza que deseja cancelar esta reserva?")) {
    //Manda o pedido de cancelamento pra API
    api("PUT", `/reservas/cancelar/${id}`).then(() => listarReservas());
  }
}

window.onload = listarReservas;
