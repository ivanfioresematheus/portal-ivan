// =====================================
// RODADA
// =====================================
async function salvarRodada() {

    try {

        const rodada = Number(document.getElementById("rodada").value);

        const competicao = document.getElementById("competicao").value;

        const casa = document.getElementById("timeCasa").value.trim();

        const visitante = document.getElementById("timeVisitante").value.trim();

        const golsCasa = Number(document.getElementById("golsCasa").value || 0);

        const golsVisitante = Number(document.getElementById("golsVisitante").value || 0);

        const golsIvan = Number(document.getElementById("golsIvan").value || 0);

        const assistenciasIvan = Number(document.getElementById("assistenciasIvan").value || 0);

        const valorMercado = Number(document.getElementById("valorMercado").value || 0);

        await salvarPartidaBotafogo(
            rodada,
            competicao,
            casa,
            visitante,
            golsCasa,
            golsVisitante,
            golsIvan,
            assistenciasIvan
        );

        await atualizarJogador(
            golsIvan,
            assistenciasIvan,
            valorMercado
        );

        await salvarOutrosJogos(
            rodada,
            competicao
        );

        await atualizarUltimoJogo(
            casa,
            golsCasa,
            visitante,
            golsVisitante
        );

        alert("Rodada salva com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Ocorreu um erro ao salvar a rodada.");

    }

}
}// =====================================
// ATUALIZA A CARREIRA DO IVAN
// =====================================

async function atualizarJogador(
    golsPartida,
    assistenciasPartida,
    valorMercado
){

    const { data: jogador, error } = await supabaseClient
    .from("jogador")
    .select("*")
    .eq("id",1)
    .single();

    if(error){
        console.error(error);
        throw error;
    }

    const novosJogos = jogador.jogos + 1;
    const novosGols = jogador.gols + golsPartida;
    const novasAssistencias = jogador.assistencias + assistenciasPartida;
    const novasParticipacoes = novosGols + novasAssistencias;

    const { error:updateError } = await supabaseClient
    .from("jogador")
    .update({

        jogos: novosJogos,

        gols: novosGols,

        assistencias: novasAssistencias,

        participacoes: novasParticipacoes,

        valor_mercado: valorMercado

    })
    .eq("id",1);

    if(updateError){
        console.error(updateError);
        throw updateError;
    }

}// =====================================
// SALVA OS OUTROS JOGOS
// =====================================

async function salvarOutrosJogos(
    rodada,
    competicao
){

    const casas = document.querySelectorAll(".casaExtra");
    const golsCasa = document.querySelectorAll(".golsCasaExtra");
    const golsVisitante = document.querySelectorAll(".golsVisitanteExtra");
    const visitantes = document.querySelectorAll(".visitanteExtra");

    for(let i = 0; i < casas.length; i++){

        const casa = casas[i].value.trim();
        const visitante = visitantes[i].value.trim();

        if(casa === "" || visitante === ""){
            continue;
        }

        const { error } = await supabaseClient
        .from("partidas")
        .insert({

            rodada: rodada,

            competicao: competicao,

            casa: casa,

            visitante: visitante,

            gols_casa: Number(golsCasa[i].value || 0),

            gols_visitante: Number(golsVisitante[i].value || 0),

            gols_ivan: 0,

            assistencias_ivan: 0,

            finalizado: true,

            contabilizada: false

        });

        if(error){
            console.error(error);
            throw error;
        }

    }

}// =====================================
// ATUALIZA ÚLTIMO JOGO
// =====================================

async function atualizarUltimoJogo(
    casa,
    golsCasa,
    visitante,
    golsVisitante
){

    const descricao = `${casa} ${golsCasa} x ${golsVisitante} ${visitante}`;

    const { error } = await supabaseClient
        .from("configuracao")
        .update({
            valor: descricao
        })
        .eq("chave", "ultimo_jogo");

    if (error) {
        console.error(error);
    }

}
