console.log("rodada.js carregado");
// ======================================
// RODADA.JS
// ======================================

// Salva toda a rodada
async function salvarRodada() {

  try {

    const dados = lerFormulario();

    await salvarPartidaBotafogo(dados);

    await atualizarJogador(dados);

    await salvarOutrosJogos(dados.rodada, dados.competicao);

    await atualizarUltimoJogo(dados);

    alert("Rodada salva com sucesso!");

  } catch (erro) {

    console.error(erro);

    alert("Erro ao salvar a rodada.");

  }

}

// ======================================
// LÊ OS DADOS DO FORMULÁRIO
// ======================================

function lerFormulario() {

  return {

    rodada: Number(document.getElementById("rodada").value),

    competicao: document.getElementById("competicao").value,

    casa: document.getElementById("timeCasa").value.trim(),

    visitante: document.getElementById("timeVisitante").value.trim(),

    golsCasa: Number(document.getElementById("golsCasa").value || 0),

    golsVisitante: Number(document.getElementById("golsVisitante").value || 0),

    golsIvan: Number(document.getElementById("golsIvan").value || 0),

    assistenciasIvan: Number(document.getElementById("assistenciasIvan").value || 0),

    valorMercado: Number(document.getElementById("valorMercado").value || 0)

  };

}// ======================================
// SALVA A PARTIDA DO BOTAFOGO-SP
// ======================================

async function salvarPartidaBotafogo(dados) {

  const { error } = await supabaseClient
    .from("partidas")
    .insert({
      rodada: dados.rodada,
      competicao: dados.competicao,
      casa: dados.casa,
      visitante: dados.visitante,
      gols_casa: dados.golsCasa,
      gols_visitante: dados.golsVisitante,
      gols_ivan: dados.golsIvan,
      assistencias_ivan: dados.assistenciasIvan,
      finalizado: true,
      contabilizada: false
    });

  if (error) {
    throw error;
  }

}

// ======================================
// ATUALIZA O JOGADOR
// ======================================

async function atualizarJogador(dados) {

  const { data: jogador, error } = await supabaseClient
    .from("jogador")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    throw error;
  }

  const { error: updateError } = await supabaseClient
    .from("jogador")
    .update({
      jogos: jogador.jogos + 1,
      gols: jogador.gols + dados.golsIvan,
      assistencias: jogador.assistencias + dados.assistenciasIvan,
      participacoes:
        (jogador.gols + dados.golsIvan) +
        (jogador.assistencias + dados.assistenciasIvan),
      valor_mercado: dados.valorMercado
    })
    .eq("id", 1);

  if (updateError) {
    throw updateError;
  }

}// ======================================
// SALVA OS OUTROS JOGOS DA RODADA
// ======================================

async function salvarOutrosJogos(rodada, competicao) {

    const jogos = obterOutrosJogos();

    for (const jogo of jogos) {

        const { error } = await supabaseClient
            .from("partidas")
            .insert({
                rodada: rodada,
                competicao: competicao,
                casa: jogo.casa,
                visitante: jogo.visitante,
                gols_casa: jogo.golsCasa,
                gols_visitante: jogo.golsVisitante,
                gols_ivan: 0,
                assistencias_ivan: 0,
                finalizado: true,
                contabilizada: false
            });

        if (error) {
            throw error;
        }

    }

}

// ======================================
// ATUALIZA O ÚLTIMO JOGO
// ======================================

async function atualizarUltimoJogo(dados) {

  const descricao =
    `${dados.casa} ${dados.golsCasa} x ${dados.golsVisitante} ${dados.visitante}`;

  const { error } = await supabaseClient
    .from("configuracao")
    .update({
      valor: descricao
    })
    .eq("chave", "ultimo_jogo");

  if (error) {
    throw error;
  }

}document.addEventListener("DOMContentLoaded", () => {

  const botao = document.getElementById("salvarRodada");

  if (botao) {

    botao.addEventListener("click", salvarRodada);

  }

});function obterOutrosJogos() {

    const jogos = [];

    const casas = document.querySelectorAll(".casaExtra");
    const golsCasa = document.querySelectorAll(".golsCasaExtra");
    const golsVisitante = document.querySelectorAll(".golsVisitanteExtra");
    const visitantes = document.querySelectorAll(".visitanteExtra");

    for (let i = 0; i < casas.length; i++) {

        const casa = casas[i].value.trim();
        const visitante = visitantes[i].value.trim();

        if (!casa || !visitante) continue;

        jogos.push({
            casa,
            visitante,
            golsCasa: Number(golsCasa[i].value || 0),
            golsVisitante: Number(golsVisitante[i].value || 0)
        });

    }

    return jogos;

}// ======================================
// ADICIONAR OUTRO JOGO
// ======================================

function adicionarJogo() {

    const lista = document.getElementById("listaJogos");

    const novoJogo = document.createElement("div");

    novoJogo.className = "jogo-extra";

    novoJogo.innerHTML = `
        <input type="text" placeholder="Time da Casa" class="casaExtra">

        <input type="number" placeholder="0" class="golsCasaExtra">

        <span>X</span>

        <input type="number" placeholder="0" class="golsVisitanteExtra">

        <input type="text" placeholder="Time Visitante" class="visitanteExtra">

        <br><br>
    `;

    lista.appendChild(novoJogo);

}

// ======================================
// INICIALIZAÇÃO
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const botaoAdicionar = document.getElementById("adicionarJogo");

    if (botaoAdicionar) {
        botaoAdicionar.addEventListener("click", adicionarJogo);
    }

    const botaoSalvar = document.getElementById("salvarRodada");

    if (botaoSalvar) {
        botaoSalvar.addEventListener("click", salvarRodada);
    }

});
