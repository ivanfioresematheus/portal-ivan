const jogador = {
  nome: "Ivan",
  idade: 17,
  clube: "Botafogo-SP",
  posicao: "Meia-atacante",
  camisa: 8,
  overall: 69,

  jogos: 10,
  gols: 7,
  assistencias: 0,
  participacoes: 7,

  valorMercado: "US$ 800 mil",

  ultimoJogo: "Botafogo-SP 1 x 1 Ponte Preta",
  proximoJogo: "Ceará x Botafogo-SP"
};

function atualizarHome() {
  const jogos = document.getElementById("jogos");
  const gols = document.getElementById("gols");
  const assistencias = document.getElementById("assistencias");
  const valor = document.getElementById("valor");

  if (jogos) jogos.textContent = jogador.jogos;
  if (gols) gols.textContent = jogador.gols;
  if (assistencias) assistencias.textContent = jogador.assistencias;
  if (valor) valor.textContent = jogador.valorMercado;
}

document.addEventListener("DOMContentLoaded", atualizarHome);
