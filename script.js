const portal = {
  jogador: {
    nome: "Ivan",
    idade: 17,
    clube: "Botafogo-SP",
    camisa: 8,
    posicao: "Meia-atacante",
    overall: 69,
    jogos: 10,
    gols: 7,
    assistencias: 0,
    participacoes: 7,
    valorMercado: "US$ 800.000"
  },

  ultimoJogo: {
    casa: "Botafogo-SP",
    golsCasa: 1,
    visitante: "Ponte Preta",
    golsVisitante: 1
  },

  proximoJogo: {
    casa: "Ceará",
    visitante: "Botafogo-SP"
  }
};

function atualizarHome() {
  const jogos = document.getElementById("jogos");
  const gols = document.getElementById("gols");
  const assistencias = document.getElementById("assistencias");
  const valor = document.getElementById("valor");

  if (jogos) jogos.textContent = portal.jogador.jogos;
  if (gols) gols.textContent = portal.jogador.gols;
  if (assistencias) assistencias.textContent = portal.jogador.assistencias;
  if (valor) valor.textContent = portal.jogador.valorMercado;

  const ultimo = document.getElementById("ultimoJogo");
  if (ultimo) {
    ultimo.textContent =
      `${portal.ultimoJogo.casa} ${portal.ultimoJogo.golsCasa} x ${portal.ultimoJogo.golsVisitante} ${portal.ultimoJogo.visitante}`;
  }

  const proximo = document.getElementById("proximoJogo");
  if (proximo) {
    proximo.textContent =
      `${portal.proximoJogo.casa} x ${portal.proximoJogo.visitante}`;
  }
}

document.addEventListener("DOMContentLoaded", atualizarHome);