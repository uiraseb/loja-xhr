
document.getElementById("carregar").addEventListener(
    "click",
    function () {
        const xhr = new XMLHttpRequest();

        const status = document.getElementById("status");
        const lista = document.getElementById("produtos");

        status.textContent = "Carregando...";
        lista.replaceChildren();

        xhr.open(
            "GET",
            "https://dummyjson.com/products?limit=5",
            true
        );

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const dados = JSON.parse(xhr.responseText);

                        dados.products.forEach(function (produto) {
                            const item = document.createElement("li");
                            item.textContent = produto.title;
                            lista.appendChild(item);
                        });

                        status.textContent = "Produtos carregados!";
                    } catch (erro) {
                        status.textContent = "Resposta JSON inválida.";
                    }
                } else {
                    status.textContent = "Erro na requisição.";
                }
            }
        };

        xhr.onerror = function () {
            status.textContent = "Erro de conexão.";
        };

        xhr.send();
    }
);
