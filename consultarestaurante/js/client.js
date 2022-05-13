function consultarRestaurante() {
    $.ajax({
        url: "http://localhost:8080/cozinhas",
        type: "GET",
        headers: {
            "X-Teste": "ABC"
        },
        success: function(response) {
            $("#conteudo").text(JSON.stringify(response));
        }
    });
}

function fecharRestaurante() {
    $.ajax({
        url: "http://localhost:8080/restaurantes/1/fechamento",
        type: "PUT",
        success: function(response) {
            alert("Restaurante foi fechado");
        }
    });
}

$("#botao").click(consultarRestaurante);