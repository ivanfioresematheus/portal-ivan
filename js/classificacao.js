// ======================================
// CLASSIFICAÇÃO
// ======================================

async function atualizarTime(nomeTime, golsPro, golsContra) {

    const { data: time, error } = await supabaseClient
        .from("classificacao")
        .select("*")
        .eq("clube", nomeTime)
        .single();

    if (error || !time) {
        console.error(error);
        return;
    }

    let pontos = time.pontos;
    let vitorias = time.vitorias;
    let empates = time.empates;
    let derrotas = time.derrotas;

    if (golsPro > golsContra) {
        pontos += 3;
        vitorias += 1;
    } else if (golsPro === golsContra) {
        pontos += 1;
        empates += 1;
    } else {
        derrotas += 1;
    }

    const jogos = time.jogos + 1;
    const gols_pro = time.gols_pro + golsPro;
    const gols_contra = time.gols_contra + golsContra;
    const saldo = gols_pro - gols_contra;

    const { error: updateError } = await supabaseClient
        .from("classificacao")
        .update({
            pontos,
            jogos,
            vitorias,
            empates,
            derrotas,
            gols_pro,
            gols_contra,
            saldo
        })
        .eq("clube", nomeTime);

    if (updateError) {
        console.error(updateError);
    }

}
