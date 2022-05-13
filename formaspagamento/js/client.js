function consultar() {
	$.ajax({
		url: "http://localhost:8080/pagamentos",
		type: "get",
		success: function (response) {
			preencherTabela(response);
		}
	});
}

function cadastrarFormaPagamento() {
	var formaPagamentoJSON = JSON.stringify({
		"descricao": $("#campo-descricao").val()
	});

	console.log(formaPagamentoJSON);

	$.ajax({
		url: "http://localhost:8080/pagamentos",
		type: "post",
		data: formaPagamentoJSON,
		contentType: "application/json",
		success: function (response) {
			alert("Forma de pagamento adicionada!");
			consultar();
		},

		error: function (error) {
			if (error.status == 400) {
				var problem = JSON.parse(error.responseText);
				alert(problem.userMessage);
			} else {
				alert("Erro ao cadastrar forma de pagamento");
			}
		}
	});
}

function excluir(formaPagamento) {

	var urlFormaPagamento = "http://localhost:8080/pagamentos/" + formaPagamento.id;

	console.log("teste de exclusao");

	$.ajax({
		url: "http://localhost:8080/pagamentos/" + formaPagamento.id,
		type: "delete",

		success: function (response) {
			consultar();
			alert("Forma de pagamento removida");
		},

		error: function (error) {
			if (error.status >= 400 && error.status <= 499) {
				var problem = JSON.parse(error.responseText);
				alert(problem.userMessage);
			} else {
				alert("Erro ao remover forma de pagamento");
			}
		}
	});
}


function preencherTabela(formasPagamento) {
	$("#tabela tbody tr").remove();

	$.each(formasPagamento, function (i, formaPagamento) {
		var linha = $("<tr>");

		var linkAcao = $("<a href='#'>")
			.text("Excluir")
			.click(function (event) {
				event.preventDefault();
				excluir(formaPagamento);
			});


		linha.append(
			$("<td>").text(formaPagamento.id),
			$("<td>").text(formaPagamento.descricao),
			$("<td>").append(linkAcao)
		);

		linha.appendTo("#tabela");
	});
}


$("#btn-consultar").click(consultar);
$("#btn-cadastrar").click(cadastrarFormaPagamento);