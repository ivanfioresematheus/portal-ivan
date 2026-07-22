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

  const gols = Number(document.getElementById("golsIvan").value);
  const assistencias = Number(document.getElementById("assistenciasIvan").value);
  const valor = Number(document.getElementById("valorMercado").value);

  const { error } = await supabaseClient
    .from("jogador")
    .update({
      gols: gols,
      assistencias: assistencias,
      participacoes: gols + assistencias,
      valor_mercado: valor
    })
    .eq("id", 1);

  if (error) {
    console.error(error);
    alert("Erro ao salvar jogador.");
    return;
  }

  carregarJogador();

  const rodada = Number(document.getElementById("rodada").value);
  const casa = document.getElementById("timeCasa").value;
  const visitante = document.getElementById("timeVisitante").value;
  const golsCasa = Number(document.getElementById("golsCasa").value);
  const golsVisitante = Number(document.getElementById("golsVisitante").value);

  const { error: erroPartida } = await supabaseClient
    .from("partidas")
    .insert({
      rodada: rodada,
      competicao: "Brasileirão Série B",
      casa: casa,
      visitante: visitante,
      gols_casa: golsCasa,
      gols_visitante: golsVisitante,
      gols_ivan: gols,
      assistencias_ivan: assistencias,
      finalizado: true
    });

  if (erroPartida) {

    console.error(erroPartida);

    alert(
      "Erro ao registrar a partida:\n\n" +
      JSON.stringify(erroPartida)
    );

    return;

  }

  alert("Jogador e partida atualizados com sucesso!");

}

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("jogos")) {
    carregarJogador();
  }

});
