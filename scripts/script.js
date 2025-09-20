var dados;  // Armazena o banco de dados
var correspondentes = [];  // Array que conterá os elementos correspondentes
pegar_dados();  // Atualizamos o banco de dados
document.getElementById("texto").addEventListener('keyup', procurar);  // Adiciona o bind ao elemento
document.getElementById("botao").addEventListener('click', validar);  // Adiciona o bind ao elemento

function procurar(event){  // Procura o que o usuário digitou
    var keywords;  // Criamos a lista dos elementos a serem procurados

    if (event.key == "Enter") {  // Se for enter validamos
        let endereco = "results?";  // Criamos o endereço base
        for (let aux = 0; aux < correspondentes.length; aux += 1) {  // Corremos cada correspondencia
            endereco += correspondentes[aux].getElementsByTagName("titulo")[0].parentNode.nodeName + "&";  // Formatamos
            open(endereco, "_self")}}  // Mandamos abrir a página que lidará com os resultados encontrados

    else {  // Caso contrário apenas atualizamos as variáveis
    correspondentes = [];  // Limpamos a variável para não repetir
    keywords = (document.getElementById("texto").value).trim().split(" ");  // Atualizamos a variável
    var elementos = dados.getElementsByTagName("titulo");  // Armazena todos os elementos da lista

    for (let aux = 0; aux < elementos.length; aux += 1){  // Corremos os titulos
        let texto = elementos[aux].textContent.toLowerCase();  // Salvamos o titulo
        let produto = elementos[aux].parentNode;  // E seu pai

        for (let aux2 = 0; aux2< keywords.length; aux2 += 1){  // Corremos todos as keywords
            if (keywords[aux2] != "" && keywords[aux2].length >= 2) {  // Se não for uma palavra vazia ou especial
                if (texto.includes(keywords[aux2].toLowerCase())){correspondentes.push(produto); break}}}}  // Se incluir a gente adiciona
     sugestoes(correspondentes)}}  // Por final, acionamos a função que mostra os itens encontrados ao usuário

function validar(){  // Função acionada quando o botão é pressionado
    let endereco = "results?";  // Criamos o endereço base
    for (let aux = 0; aux < correspondentes.length; aux += 1) {  // Corremos cada correspondencia
        endereco += correspondentes[aux].getElementsByTagName("titulo")[0].parentNode.nodeName + "&";  // Formatamos
        open(endereco, "_self")}}  // Mandamos abrir a página que lidará com os resultados encontrados

function sugestoes(itens){  // Mostra na tela os itens sugeridos
    var caixa = document.getElementsByClassName("sugestao_pesquisa")[0];  // Pegamos a referencia da caixa
    caixa.innerHTML = "";  // Começamos limpando a caixa de seleções anteriores
    if (itens.length == 0) {caixa.innerHTML = ""}  // Se a lista estiver vazia limpaos a caixa
    else {  // Caso tenha alguma sugestão de item
        for (let aux = 0; aux < itens.length; aux += 1){  // Corremos todas as sugestões
            let item = document.createElement("h3");  // Criamos um elemento
            item.innerHTML = itens[aux].getElementsByTagName("titulo")[0].textContent;  // Bind do texto
            item.alt = itens[aux].nodeName;  // Adicionamos uma referência para a chamada da função
            item.style.cursor = "pointer";  // Alteramos o cursor, para dar um efeito de seleção
            item.addEventListener('click', function(){open("product?" + event.target.alt, "_self")});  // Bind do evento
            caixa.appendChild(item)}}}  // Agora pronto, adicionamos o item à lista de sugestões

function pegar_dados(){  // Adquire a informação do banco de dados
    var xhttp = new XMLHttpRequest();  // Cria uma nova requisição
    xhttp.open("GET", "data.xml", true);  // Usa o método "GET" para abrir
    xhttp.send();  // Envia os dados para o servidor

    /* No comando abaixo definimos que depois de receber a aprovação o banco de dados será atualizado e a imagem irá adaptar os elementos */
    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {dados = this.responseXML}}}