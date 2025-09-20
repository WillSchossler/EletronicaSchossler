var dados;  // Variável que armazena os dados
var lista_miniaturas;  // Coleta as miniaturas
var imagem_grande;  // Coletamos a imagem grande
var indice = -1;  // Variável usada para trocar as imagens
var max_i = 2;  // Armazena a quantidade de miniaturas disponível
var clock;  // Variável auxiliar para que os elementos se alternem

pegar_dados();  // Pegamos os dados do banco criado com XML

function selecionar_imagem(elemento) {  // função usada pra trocar a imagem principal
    clearInterval(clock); clock = setInterval(trocador, 10000);  // Atualizamos o timer

    if (document.getElementsByClassName("miniaturas")[0] == elemento) {indice = 0}
    else if (document.getElementsByClassName("miniaturas")[1] == elemento) {indice = 1}
    else if (document.getElementsByClassName("miniaturas")[2] == elemento) {indice = 2}

    imagem_grande.classList.add("fadeIn");  // Primeiro adicionamos a animação
    imagem_grande.addEventListener("animationend", function() {imagem_grande.classList.remove("fadeIn")});  // Removemos quando acabar

    imagem_grande.src = elemento.getElementsByTagName("img")[0].src;  //  Alteramos a fonte da imagem principal

    /* No trecho abaixo corremos todas as minuaturas para ajustar o item selecionado (a borda) */
    for (let aux = 0; aux < lista_miniaturas.length; aux++) {
        if (lista_miniaturas[aux].classList.contains("menu_selecionado")) {lista_miniaturas[aux].classList.remove("menu_selecionado")}}
    elemento.classList.add("menu_selecionado")}  // No final marcamos o elemento em questão como o ativo

function trocador(sentido=1){  // Função utilizada para trocar os elementos
    indice += sentido;  // Aumentamos o índice da variável

    if (indice > max_i) {indice = 0}  // Se passar do máximos voltamos pro inicio
    else if (indice < 0) {indice = max_i}  // Se passar do mínimo voltamos para o máximo

    selecionar_imagem(lista_miniaturas[indice]);}  // Atualizamos a imagem

function atualizar_elementos() {  // Atualiza o valor das variáveis logo no inicio
    lista_miniaturas = document.getElementsByClassName("miniaturas");  // Atualizamos a lista com as miniaturas
    imagem_grande = document.getElementById("imagem_grande");  // E também ordenamos que a imagem grande se atualize

    trocador();}  // Damos inicio ao primeiro pulo, que irá acionar o trigger e continuar a função

function pegar_dados(){  // Adquire a informação do banco de dados
    var xhttp = new XMLHttpRequest();  // Cria uma nova requisição
    xhttp.open("GET", "data.xml", true);  // Usa o método "GET" para abrir
    xhttp.send();  // Envia os dados para o servidor

    /* No comando abaixo definimos que depois de receber a aprovação o banco de dados será atualizado e a partir dos parâmetros irá atualizar o documento */
    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {dados = this.responseXML; atualizar_elementos(); atualizar_dados()}}}

function atualizar_dados(){  // Atualiza as informações passadas
    let tag = location.search.slice(1).split("&")[0];  // Armazena o nome do elemento
    let elemento = dados.getElementsByTagName(tag)[0];  // Coleta o objeto alvo

    // Primeiramente coletamos todos os dados básicos do elemento
    let titulo = elemento.getElementsByTagName("titulo")[0].textContent.trim();
    let sumario = elemento.getElementsByTagName("sumario")[0].textContent.trim();
    let estoque = elemento.getElementsByTagName("estoque")[0].textContent.trim();
    let de = elemento.getElementsByTagName("de")[0].textContent.trim();
    let preco = elemento.getElementsByTagName("preco")[0].textContent.trim();
    let estado = elemento.getElementsByTagName("estado")[0].textContent.trim();
    let garantia = elemento.getElementsByTagName("garantia")[0].textContent.trim();
    let imagem1 = elemento.getElementsByTagName("imagem")[0].textContent.trim();
    let imagem2 = elemento.getElementsByTagName("imagem")[1].textContent.trim();
    let imagem3 = elemento.getElementsByTagName("imagem")[2].textContent.trim();
    let informacoes = elemento.getElementsByTagName("info")[0].textContent.trim();
    let anuncio1 = dados.getElementsByTagName(elemento.getElementsByTagName("anuncio_principal")[0].textContent.trim())[0];
    let anuncio2 = dados.getElementsByTagName(elemento.getElementsByTagName("anuncio_secundario")[0].textContent.trim())[0];
    let anuncio3 = dados.getElementsByTagName(elemento.getElementsByTagName("anuncio_terciario")[0].textContent.trim())[0];

    // Adicionamos as especificações
    let especifidades = document.getElementById("especificacoes");
    for (let aux = 0; aux < elemento.getElementsByTagName("spec").length; aux += 1) {
        especifidades.innerHTML += ("<li>"+elemento.getElementsByTagName("spec")[aux].textContent+"</li>");}

    // Abaixo acontece a alteração dos elementos, coletados acima
    document.getElementById("imagem_grande").src = imagem1;
    document.getElementById("titulo").innerHTML = titulo;
    document.getElementById("sumario").innerHTML = sumario;
    document.getElementById("por").innerHTML = "R$ " + preco;
    document.getElementById("descricao").innerHTML = informacoes;
    document.getElementById("estado").innerHTML = "Produto " + estado;
    document.getElementById("miniatura_1").getElementsByTagName("img")[0].src = imagem1;
    document.getElementById("miniatura_2").getElementsByTagName("img")[0].src = imagem2;

    if (Number(imagem3) != 0) {document.getElementById("miniatura_3").getElementsByTagName("img")[0].src = imagem3}
    else {document.getElementById("miniatura_3").style = "display: none"; max_i = 1}


    // Pegamos a referência do objeto que anuncio
    let anuncio_mobile = document.getElementById("anuncio_mobile");
    let anuncio_1 = document.getElementById("anuncio_1");
    let anuncio_2 = document.getElementById("anuncio_2");
    let anuncio_3 = document.getElementById("anuncio_3");

    // Ajustamos o conteúdo dos anuncios, um após o outro até acabar
    anuncio_mobile.getElementsByTagName("img")[0].src = anuncio1.getElementsByTagName("imagem")[0].textContent;
    anuncio_mobile.getElementsByTagName("h1")[0].innerHTML = anuncio1.getElementsByTagName("titulo")[0].textContent;
    anuncio_mobile.getElementsByTagName("h2")[0].innerHTML = anuncio1.getElementsByTagName("preco")[0].textContent;
    anuncio_mobile.addEventListener("click", function(){open("product?" + anuncio1.nodeName)});

    anuncio_1.getElementsByTagName("img")[0].src = anuncio1.getElementsByTagName("imagem")[0].textContent;
    anuncio_1.getElementsByTagName("h1")[0].innerHTML = anuncio1.getElementsByTagName("titulo")[0].textContent;
    anuncio_1.getElementsByTagName("h2")[0].innerHTML = anuncio1.getElementsByTagName("preco")[0].textContent;
    anuncio_1.addEventListener("click", function(){open("product?" + anuncio1.nodeName)});

    anuncio_2.getElementsByTagName("img")[0].src = anuncio2.getElementsByTagName("imagem")[0].textContent;
    anuncio_2.getElementsByTagName("h1")[0].innerHTML = anuncio2.getElementsByTagName("titulo")[0].textContent;
    anuncio_2.getElementsByTagName("h2")[0].innerHTML = anuncio2.getElementsByTagName("preco")[0].textContent;
    anuncio_2.addEventListener("click", function(){open("product?" + anuncio2.nodeName)});

    anuncio_3.getElementsByTagName("img")[0].src = anuncio3.getElementsByTagName("imagem")[0].textContent;
    anuncio_3.getElementsByTagName("h1")[0].innerHTML = anuncio3.getElementsByTagName("titulo")[0].textContent;
    anuncio_3.getElementsByTagName("h2")[0].innerHTML = anuncio3.getElementsByTagName("preco")[0].textContent;
    anuncio_3.addEventListener("click", function(){open("product?" + anuncio3.nodeName)});


    // Analisamos a disponibilidade e damos um retorno adequado
    let disponibilidade = document.getElementById("disponibilidade");
    if (Number(estoque) > 0) {disponibilidade.innerHTML = "Disponível: " + estoque + " unidade(s)"}
    else {disponibilidade.style.color = "red"; disponibilidade.innerHTML = "Indisponível"}

    // Analisamos abaixo se devemos mostrar o pega idiota
    if (isNaN(de)) {document.getElementById("de_2").innerHTML = de}
    else {document.getElementById("de").style.display = "none"}

    // Analisamos abaixo se devemos mostrar a garantia
    if (Number(garantia) > 0) {    document.getElementById("garantia").innerHTML = "Garantia de " + garantia + " meses"}
    else {document.getElementById("garantia").style.display = "none"}
}

