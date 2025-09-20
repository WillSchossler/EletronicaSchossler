var dados;  // Armazena o banco de dados
pegar_dados();  // Atualizamos o banco de dados


function produtos(){  // Filtra os resultados obtidos
    var keywords = location.search.slice(1, -1).split("&");  // Separamos em uma array os elementos

    var elementos = [];  // Variável que irá armazenar os elementos do banco de dados

    for (let aux = 0; aux < keywords.length; aux += 1){  // Corremos todas as keywords
        elementos.push(dados.getElementsByTagName(keywords[aux])[0])}  // E adicionamos à lista

    criar_elementos(elementos)  // Por final, chamamos a função que mostrará na tela os elementos
}

function pegar_dados(){  // Adquire a informação do banco de dados
    var xhttp = new XMLHttpRequest();  // Cria uma nova requisição
    xhttp.open("GET", "data.xml", true);  // Usa o método "GET" para abrir
    xhttp.send();  // Envia os dados para o servidor

    /* No comando abaixo definimos que depois de receber a aprovação o banco de dados será atualizado e a imagem irá adaptar os elementos */
    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {dados = this.responseXML; produtos();}}}

function criar_elementos(elementos){  // Cria a quantidade adequada de itens
    let divisoria = document.getElementsByTagName("section")[0];  // Pegamos a divisória onde serão criados os itens
    let quantidade = elementos.length;  // Verificamos a quantidade de itens a ser criados

    for (let aux = 0; aux < quantidade; aux += 1) {  // Corremos todos os elementos
        let imagem = elementos[aux].getElementsByTagName("imagem")[0].textContent;  // Coletamos a imagem
        let titulo = elementos[aux].getElementsByTagName("titulo")[0].textContent;  // O seu título
        let preco = elementos[aux].getElementsByTagName("preco")[0].textContent;  // O seu praço
        let estoque = elementos[aux].getElementsByTagName("estoque")[0].textContent;  // Seu estoque

        let container = document.createElement("div");  // Criamos uma divisória
        container.classList.add("item_container");  // Ajustamos sua classe
        container.addEventListener('click', function(){open("product?" + elementos[aux].nodeName)});  // Bind da abertura

        let ele_imagem = document.createElement("img");  // Criamos a imagem
        ele_imagem.src = imagem;  // Ajustamos o enderenço

        let ele_titulo = document.createElement("h1");  // Criamos o titulo
        ele_titulo.innerHTML = titulo;  // Alteramos o texto

        let ele_preco = document.createElement("h2");  // Criamos o preço
        ele_preco.innerHTML = preco;  // Definimos o valor

        let ele_estoque = document.createElement("h5");  // Criamos e ajustamos a disponibilidade conforme o estoque
        if (estoque > 0) {ele_estoque.innerHTML = "Disponível"; ele_estoque.style="color: green; font-size: 12px; margin: 0";}
        else {ele_estoque.innerHTML = "Indisponível"; ele_estoque.style="color: red; font-size: 12px; margin: 0";}

        /* Adição dos elementos à tela */
        container.appendChild(ele_imagem);
        container.appendChild(ele_titulo);
        container.appendChild(ele_preco);
        container.appendChild(ele_estoque);
        divisoria.appendChild(container)}}