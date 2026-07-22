const SUPABASE_URL = "https://ywjkuskimdtxymathnxj.supabase.co";
const SUPABASE_KEY = "sb_publishable_VNSgRxU9GBi-XVY_iPZl8g_HoG-UGuz";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function carregarJogador() {

  const { data, error } = await supabaseClient
    .from("jogador")
    .select("*")
    .limit(1);

  if (error) {
    console.error(error);
    return;
  }

  if (!data || data.length === 0) return;

  const jogador = data[0];

  document.getElementById("jogos").textContent = jogador.jogos;
  document.getElementById("gols").textContent = jogador.gols;
  document.getElementById("assistencias").textContent = jogador.assistencias;
  document.getElementById("valor").textContent =
    "US$ " + Number(jogador.valor_mercado).toLocaleString("pt-BR");

}

carregarJogador();async function salvarJogador() {

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
    .eq("nome", "Ivan");

  if (error) {
    alert("Erro ao salvar.");
    console.error(error);
    return;
  }

  alert("Jogador atualizado com sucesso!");
}
