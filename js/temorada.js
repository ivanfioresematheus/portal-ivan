function iniciarTemporada() {
    alert("Nova temporada iniciada!");
}

document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("iniciarTemporada");

    if (botao) {
        botao.addEventListener("click", iniciarTemporada);
    }

});
