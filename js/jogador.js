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
