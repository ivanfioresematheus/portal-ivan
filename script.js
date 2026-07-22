const SUPABASE_URL = "https://ywjkuskimdtxymathnxj.supabase.co";
const SUPABASE_KEY = "sb_publishable_VNSgRxU9GBi-XVY_iPZl8g_HoG-UGuz";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===============================
// HOME
// ===============================

async function carregarJogador() {

  const { data, error } = await supabaseClient
    .from("jogador")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  const jogos = document.getElementById("jogos");
  const gols = document.getElementById("gols");
  const assistencias = document.getElementById("assistencias");
  const valor = document.getElementById("valor");

  if (jogos) jogos.textContent = data.jogos;
  if (gols) gols.textContent = data.gols;
  if (assistencias) assistencias.textContent = data.assistencias;

  if (valor) {
    valor.textContent =
      "US$ " + Number(data.valor_mercado).toLocaleString("pt-BR");
  }

}

// ===============================
// PAINEL
// ===============================

async function salvarJogador() {

  const golsPartida = Number(document.getElementById("golsIvan").value || 0);
  const assistenciasPartida = Number(document.getElementById("assistenciasIvan").value || 0);
  const valorMercado = Number(document.getElementById("valorMercado").value || 0);

  const rodada = Number(document.getElementById("rodada").value || 0);

  const casa = document.getElementById("timeCasa").value.trim();
  const visitante = document.getElementById("timeVisitante").value.trim();

  const golsCasa = Number(document.getElementById("golsCasa").value || 0);
  const golsVisitante = Number(document.getElementById("golsVisitante").value || 0);

  // ===============================
  // BUSCA A CARREIRA ATUAL
  // ===============================

  const { data: jogadorAtual, error: erroBusca } = await supabaseClient
    .from("jogador")
    .select("*")
    .eq("id", 1)
    .single();

  if (erroBusca) {
    console.error(erroBusca);
    alert("Erro ao buscar os dados do jogador.");
    return;
  }

  // ===============================
  // CALCULA OS NOVOS TOTAIS
  // ===============================

  const novosJogos = jogadorAtual.jogos + 1;
  const novosGols = jogadorAtual.gols + golsPartida;
  const novasAssistencias = jogadorAtual.assistencias + assistenciasPartida;
  const novasParticipacoes = novosGols + novasAssistencias;

  // ===============================
  // ATUALIZA A CARREIRA
  // ===============================

  const { error: erroJogador } = await supabaseClient
    .from("jogador")
    .update({
      jogos: novosJogos,
      gols: novosGols,
      assistencias: novasAssistencias,
      participacoes: novasParticipacoes,
      valor_mercado: valorMercado
    })
    .eq("id", 1);

  if (erroJogador) {
    console.error(erroJogador);
    alert("Erro ao atualizar o jogador.");
    return;
  }

  // ===============================
  // REGISTRA A PARTIDA
  // ===============================

  const { error: erroPartida } = await supabaseClient
    .from("partidas")
    .insert({
      rodada: rodada,
      competicao: "Brasileirão Série B",
      casa: casa,
      visitante: visitante,
      gols_casa: golsCasa,
      gols_visitante: golsVisitante,
      gols_ivan: golsPartida,
      assistencias_ivan: assistenciasPartida,
      finalizado: true
    });

  if (erroPartida) {
    console.error(erroPartida);
    alert("Erro ao registrar a partida.");
    return;
  }

  // ===============================
  // ATUALIZA O ÚLTIMO JOGO
  // ===============================

  if (casa === "Botafogo-SP" || visitante === "Botafogo-SP") {

    const descricao =
      `${casa} ${golsCasa} x ${golsVisitante} ${visitante}`;

    await supabaseClient
      .from("configuracao")
      .update({
        valor: descricao
      })
      .eq("chave", "ultimo_jogo");

  }

  carregarJogador();

  alert("Rodada salva com sucesso!");

}

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("jogos")) {
    carregarJogador();
  }

});
