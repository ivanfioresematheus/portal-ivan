async function carregarClassificacao() {

    const { data, error } = await supabaseClient
        .from("classificacao")
        .select("*")
        .order("pontos", { ascending: false })
        .order("saldo", { ascending: false })
        .order("gols_pro", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const tabela = document.getElementById("corpoTabela");

    if (!tabela) return;

    tabela.innerHTML = "";

    data.forEach((time, indice) => {

        tabela.innerHTML += `
            <tr ${time.clube === "Botafogo-SP" ? 'class="botafogo"' : ""}>
                <td>${indice + 1}</td>
                <td>${time.clube}</td>
                <td>${time.pontos}</td>
                <td>${time.jogos}</td>
                <td>${time.vitorias}</td>
                <td>${time.empates}</td>
                <td>${time.derrotas}</td>
                <td>${time.saldo}</td>
            </tr>
        `;

    });

}
