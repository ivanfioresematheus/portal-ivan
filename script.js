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

carregarJogador();
