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
    alert("Erro ao salvar.");
    return;
  }

  alert("Jogador atualizado com sucesso!");

  carregarJogador();

}

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("jogos")) {
    carregarJogador();
  }

});
