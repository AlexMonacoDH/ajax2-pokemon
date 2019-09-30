//seletores
const img = document.querySelector('img');
const input = document.querySelector('input');
const forumulario = document.querySelector('form');
const div = document.querySelector('div');
const span = document.querySelector('span');

//functions
const gerarPokemon = ()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomIntInclusive(1,150)}`)
    .then((resposta)=>{
        return resposta.json()
    })
    .then((pokemon)=>{
        img.setAttribute('src',pokemon.sprites.front_default);
        localStorage.setItem('pokemon',pokemon.name);
    })
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const validarResposta = (evt)=>{
    evt.preventDefault();
    let ls = localStorage.getItem('pokemon');

    if(input.value == ls){
       div.style.backgroundColor = '#4caf50';
       localStorage.setItem(
            'pontuacao',
            String(parseInt(localStorage.getItem('pontuacao')) + 100)
    );
    }
    else{
        div.style.backgroundColor = '#ff5722';
        localStorage.setItem(
            'pontuacao',
            String(parseInt(localStorage.getItem('pontuacao')) - 100)
    );
    }

    input.value = "";
    input.focus();
    img.style.filter = "none";

    setTimeout(()=>{
        div.style.backgroundColor = '#f9f9f9';
        img.style.filter = "brightness(0)";
        gerarPokemon();
        mostrarPontuacao();
    },1000);
}

const mostrarPontuacao = ()=>{
    if(localStorage.getItem('pontuacao') == null){
        localStorage.setItem('pontuacao','0');
    }
    span.innerHTML = localStorage.getItem('pontuacao');
}

//eventos
window.onload = ()=>{
     gerarPokemon();
     localStorage.setItem('pontuacao','0');
     mostrarPontuacao();
}
forumulario.onsubmit = validarResposta;