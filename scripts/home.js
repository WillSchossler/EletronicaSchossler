var dados;  // Variável que armazena o documento XML
pegar_dados();  // Função que pega os dados do XML logo que o documento é carregado

var i = -1; // Variável auxiliar para a alteração dos elementos de maneira elegante
var clock;  // Definição da variável que irá alterar os elementos periodicamente


function trocador(sentido=1) {  // Altera os dados do container descritivo
    var elementos = document.getElementsByClassName("item_container");  // Lista de elementos
    var max_i = elementos.length;  // Atualizamos o numero máximo de alteração de miniatura
    sentido = Number(sentido);  // Primeiro convertemos a variável para número
    i += sentido;  // Aumentamos o índice da variável

    if (i > max_i  - 1) {i = 0}  // Se passar do máximos voltamos pro inicio
    else if (i < 0) {i = max_i - 1}  // Se passar do mínimo voltamos para o máximo

    atualizar_descricao(elementos[i]);  // Por fim, usamos a função anterior para trocar

    if (elementos.length > 1) {  // Se houver mais que uma imagem
        if (clock != undefined){  // Se o relógio já existir
            clearInterval(clock);  // Limpamos o contador
            clock = setInterval(trocador, 5000);}  // Atualizamos
        else {  // Caso o relógio ainda não exista
            clock = setInterval(trocador, 5000)}}  // Apenas criamos ele
    else {  // Caso houver apenas um elemento
        clearInterval(clock)}  // Removemos o relógio

}

function pegar_dados(){  // Adquire a informação do banco de dados
    var xhttp = new XMLHttpRequest();  // Cria uma nova requisição
    xhttp.open("GET", "data.xml", true);  // Usa o método "GET" para abrir
    xhttp.send();  // Envia os dados para o servidor

    /* No comando abaixo definimos que depois de receber a aprovação o banco de dados será atualizado e a imagem irá adaptar os elementos */
    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {dados = this.responseXML; criar_selecoes()}}
}

function criar_selecoes(){  // Função que criará os menus guia
    var elementos = dados.getElementsByTagName("produtos")[0].childNodes;  // Coleta os nós
    var divisoria = document.getElementsByClassName("menu")[0];  // Coletamos também a divisória

    for (let aux = 1; aux < elementos.length; aux += 2) {  // Corremos os elementos
        let elemento = document.createElement("p");  // Criamos o elemento

        elemento.innerHTML = elementos[aux].nodeName.trim().replace(/_/g, " ");  // Definimos o texto
        elemento.style.cursor = "pointer";  // Atribuimos o estilo do ponteiro
        elemento.classList.add("options");  // Marcamos o elemento como uma opção
        elemento.addEventListener('click', alterar_selecao);  // Bind do evento
        divisoria.appendChild(elemento);  // Por fim, adicionamos o elemento à tela

        /* Se for o primeiro elemento, marcamos ele como selecionado */
        if (aux == 1) {elemento.click()}}
}

function alterar_selecao(evento) {  // Função que mostra os itens de acordo com a classe
    var categoria = dados.getElementsByTagName(evento.target.innerHTML.replace(/ /g, "_"))[0];  // Coletamos a categoria
    var divisoria = document.getElementById("exibir");  // Coletamos a divisória que alocará os elementos
    var apagar = divisoria.getElementsByClassName("item_container").length;  // Quantidade de itens a ser removidos
    var menus = document.getElementsByClassName("options");  // Armazena todos os menus disponíveis
    i = -1;  // Alteramos a variável auxiliar para que a troca de elementos seja coerente

    for (let aux = 0; aux < menus.length; aux += 1) {  // Marcamos o menu com o estilo do elemento selecionado
        if (menus[aux] == evento.target) {evento.target.classList.add("menu_selecionado")}
        else {menus[aux].classList.remove("menu_selecionado")}}

   document.getElementById("selecionado").innerHTML = evento.target.innerHTML;  // Atualizamos o titulo da categoria


    /* No comando abaixo, removemos os itens (se houverem) para que a tela fique limpa de acordo com a quantidade correta */
    if (apagar > 0) {for (let aux = 0; aux < apagar; aux += 1) {divisoria.removeChild(divisoria.childNodes[5])}}

    if (categoria.nodeName == "Destaques") {  // Se for destaques
        for (let aux = 1; aux < categoria.childNodes.length; aux += 2){  // Corremos os filhos
            let nome = dados.getElementsByTagName(categoria.childNodes[aux].innerHTML.trim())[0];  // Coletamos a referencia
            preencher(nome)}}  // E por fim, adicionamos
    else {    // Caso contrário
        for (let aux = 1; aux < categoria.childNodes.length; aux += 2){  // Coremos os elementos filhos
            preencher(categoria.childNodes[aux])}}  // E adicionamos os elementos

    trocador();  // Alteramos o elemento e realizamos as trocas temporárias

    function preencher(tag) {  // Caso seja uma categoria genérica apenas plotamos os elementos
        let container = document.createElement("div");  // Criamos o container do elemento
        container.classList.add("item_container", "fadeOut");  // Marcamos a classe dele como container e adicionamos o efeito
        container.addEventListener("animationend", function(){container.classList.remove("fadeOut")});  // Removemos o efeito
        container.addEventListener('click', function(){open("product?" + tag.nodeName, "_self")});

        let imagem = document.createElement("img");  // Criamos o elemento de imagem
        imagem.src = tag.getElementsByTagName("imagem")[0].innerHTML;  // Definimos seu endereço

        let nome = document.createElement("h1");  // Criamos o elemento de nome
        nome.innerHTML = tag.getElementsByTagName("titulo")[0].innerHTML;  // Definimos seu nome

        let preco = document.createElement("h2");  // Criamos o elemento de preço
        preco.innerHTML = tag.getElementsByTagName("preco")[0].innerHTML;  // Definimos seu valor

        let disponibilidade = document.createElement("h5");  // Criamos o elemento de disponibilidade
        let estoque = tag.getElementsByTagName("estoque")[0].innerHTML;  // Coletamos o valor de estoque
        /* Alteramos o valor e o estilo de acordo com a disponibilidade */
        if (estoque > 0) {disponibilidade.innerHTML = "Disponível"; disponibilidade.style = "color: green; font-size: 12px; margin: 0"}
        else {disponibilidade.innerHTML = "Indisponível"; disponibilidade.style = "color: red; font-size: 12px; margin: 0"}

        let item = document.createElement("h3");  // Criamos uma referência oculta do nome do elemento para futuras análises
        item.innerHTML = tag.nodeName; item.style = "display: none";  // Definimos seu estilo para não atrapalhar

        /* Adicionamos os elementos à tela*/
        container.appendChild(imagem);
        container.appendChild(nome);
        container.appendChild(preco);
        container.appendChild(item);
        container.appendChild(disponibilidade);
        divisoria.appendChild(container)}
}

function atualizar_descricao(elemento){  // Altera os dados da imagem principal
    elemento = dados.getElementsByTagName(elemento.getElementsByTagName("h3")[0].innerHTML.trim())[0];

    /* Armazenamos todos os dados de acordo com o elemento dado */
    var sumario = elemento.getElementsByTagName("sumario")[0].innerHTML.trim();
    var titulo = elemento.getElementsByTagName("titulo")[0].innerHTML.trim();
    var imagem = elemento.getElementsByTagName("imagem")[0].innerHTML.trim();
    var de = elemento.getElementsByTagName("de")[0].innerHTML.trim();
    var preco = elemento.getElementsByTagName("preco")[0].innerHTML.trim();

    /* Adicionamos uma bind à imagem, para que o usuário seja direcionado à area de itens ao clicar na imagem */
    document.getElementById("imagem_destacada").addEventListener("click", function(){open("product?"+elemento.nodeName, "_self")});

    /* Se não houver estoque alteramos a legenda e também a sua cor */
    if (de === "0") {document.getElementById("destaque_preco_de").style.display = "none"; document.getElementById("destaque_preco_por").style.textAlign = "center"}
    else {document.getElementById("destaque_preco_de").style.display = "block"; document.getElementById("destaque_preco_de_2").innerHTML = de; document.getElementById("destaque_preco_por").style.textAlign = "left"}

    /* Pegamos a referência da imagem maior */
    var imagem_grande = document.getElementsByClassName("imagem_destacada")[0];
    imagem_grande.classList.add("fadeIn");
    imagem_grande.addEventListener("animationend", function(){document.getElementsByClassName("imagem_destacada")[0].classList.remove("fadeIn");});

    /* Pegamos a referência da imagem maior */
    var legenda_imagem = document.getElementsByClassName("legenda_imagem")[0];
    legenda_imagem.classList.add("fadeOut");
    legenda_imagem.addEventListener("animationend", function(){document.getElementsByClassName("legenda_imagem")[0].classList.remove("fadeOut");});

    /* Aplicamos as informações nos elementos da imagem */
    document.getElementById("imagem_destacada").src = imagem;
    document.getElementById("destaque_titulo").innerHTML = titulo;
    document.getElementById("destaque_descricao").innerHTML = sumario;
    document.getElementById("destaque_preco_de_2").innerHTML = de;
    document.getElementById("destaque_preco_por_2").innerHTML = preco
}