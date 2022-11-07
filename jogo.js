
//to colocando a altura e a largura a nivel de scopo global. 

var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

var criaMoscaTempo = 1500;

//pegando o nivel do jogo

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal'){
    criaMoscaTempo = 1500;
} else if ( nivel === 'dificil'){
    criaMoscaTempo = 1000;
} else if ( nivel === 'hard'){
    criaMoscaTempo = 750;
}
//funcao para ssempre deixar a altura e largura atualizada
function ajustaTamanho(){
         altura = window.innerHeight;
         largura = window.innerWidth;
}

// a funcao tem que ser chamada no body com o evento onresizing
ajustaTamanho()

//com essa funcao, conseguimos fazer com que os mosquitos fiquem de forma random
//dentro da tela vista;

//criando o cronometro do jogo

var cronometro = setInterval(function(){

    tempo -= 1

    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    }
    document.getElementById('cronometro').innerHTML = tempo
    
}, 1000)

// agora tem que criar posições random com math.random
// coloco encapsulado em floor para deixar numeros arredondados
//coloco o random * altura e * largura

function posicaoRandomica(){
    // aqui cria aleatorio e vai servir par tirar ponto de vida
        if(document.getElementById('mosquito')){
            document.getElementById('mosquito').remove()

            //interromper o jogo pq perdeu 3 vidas

            if (vidas >3 ){
           window.location.href = 'fim_de_jogo.html'
            } else{
            document.getElementById('v' + vidas).src ="imagens/coracao_vazio.png"

            vidas++
            }
        }

        var posicaoX = Math.floor(Math.random() * largura) - 90;
        var posicaoY = Math.floor(Math.random() * altura) - 90;

        //para caso a posicao seja 0 temos que corrigir com

        posicaoX = posicaoX <0 ? 0 : posicaoX;
        posicaoY = posicaoY <0 ? 0 : posicaoY;

        //com o random feito,o agora temos que mexer no body adicionando img

        var mosquito = document.createElement('img')
        mosquito.src = 'imagens/mosca.png';
        mosquito.className = tamanhoAleatorio();
        mosquito.style.left = posicaoX + 'px';
        mosquito.style.top = posicaoY + 'px';
        mosquito.style.position = 'absolute';
        mosquito.id = 'mosquito'
        mosquito.onclick = function(){
           this.remove()
        }

        //posicionando ele na pagina como filho do body

        document.body.appendChild(mosquito)

        
}

posicaoRandomica()




//tamanho aleatorio da imagem. 

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random()* 3)

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2: 
        return 'mosquito3'
    }
}

//proximo passo agora é fazer o mosquito aparecer com tempo aleatorio. 

var criaMosca = setInterval(function(){
    posicaoRandomica()
    }, criaMoscaTempo)