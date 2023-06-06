var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var criaMoscaTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1500
	criaMoscaTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaMoscaTempo = 1000
} else if(nivel === 'chucknorris') {
	//750
	criaMoscaTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1 // Fica em cima porque após a execução da função é preciso decrementar esse valor para exibir

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosca)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}

}, 1000)

function posicaoRandomica() {


	//remover mosquito anterior (caso exista)
	if(document.getElementById('mosca')) {
		document.getElementById('mosca').remove()

		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3) {
			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src= "imagens/coracao_vazio.png"
			vidas++
		}
	}
	
	// Arredondamento para baixo / -90 para caber a imagem na dimensão
	var posicaoX = Math.floor(Math.random() * largura) - 90 
	// Arredondamento para baixo / -90 para caber a imagem na dimensão
	var posicaoY = Math.floor(Math.random() * altura) - 90 

	// Evita o desaparecimento da imagem quando < 0
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	// Criar o elemento html
	var mosca = document.createElement('img') // cria um documento o tipo imagem
	mosca.src = 'imagens/mosca.png' // source recebe o local da imagem que eu quero passar
	// recebe a classe com as respectivas modificações: tamanho e direção(olho para <- ou ->)
	mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio() 
	mosca.style.left = posicaoX + 'px' // recebe as coordenadas X
	mosca.style.top = posicaoY + 'px' // recebe as coordenadas Y
	mosca.style.position = 'absolute' // as coordenadas precisam ser absolutas para serem aplicadas
	mosca.id = 'mosca' //Identificação única, possível selecioná-lo
	mosca.onclick = function() {
		this.remove() // 'this' faz referência ao próprio elemento HTML que executa a função
	}

	document.body.appendChild(mosca) // body do HTML recebe mosca como filho
}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)

	switch(classe) {
	case 0:
		return 'mosquito1'
	case 1:
		return 'mosquito2'
	case 2:
		return 'mosquito3'
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)

	switch(classe) {
	case 0:
		return 'ladoA'
	case 1:
		return 'ladoB'
	}
}