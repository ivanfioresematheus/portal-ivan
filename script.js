async function carregarJogador() {
  try {
    const resposta = await fetch("data/jogador.json");
    const jogador = await resposta.json();

    document.getElementById("jogos").textContent = jogador.jogos;
    document.getElementById("gols").textContent = jogador.gols;
    document.getElementById("assistencias").textContent = jogador.assistencias;
    document.getElementById("valor").textContent =
      "US$ " + jogador.valorMercado.toLocaleString("pt-BR");

  } catch (erro) {
    console.error("Erro ao carregar jogador:", erro);
  }
}

async function carregarJogos() {
  try {
    const resposta = await fetch("data/jogos.json");
    const jogos = await resposta.json();

    document.getElementById("ultimoJogo").textContent =
      `${jogos.ultimoJogo.casa} ${jogos.ultimoJogo.placarCasa} x ${jogos.ultimoJogo.placarVisitante} ${jogos.ultimoJogo.visitante}`;

    document.getElementById("proximoJogo").textContent =
      `${jogos.proximoJogo.casa} x ${jogos.proximoJogo.visitante}`;

  } catch (erro) {
    console.error("Erro ao carregar jogos:", erro);
  }
}

carregarJogador();
carregarJogos();