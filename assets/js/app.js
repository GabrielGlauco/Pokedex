function fetchpokemon() {
const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`
// url dinâmica
let pokemonpromisses = []
// array das prommises/json pois fica mais facil manipular os objetos quando estão dentro de arrays

    for (let i = 1; i <= 150 ; i++) {
         pokemonpromisses.push(fetch(url(i)).then(response =>response.json()))
// as promisses serão inseridas dinâmicamente no array e aguardarão sua transformação em json      
    }

    Promise.all(pokemonpromisses)
/*O .all retornara as promisses do array de uma so vez quando todas estiverem resolvidas e 
transformadas em json  
*/  .then((pokemons) => {
    
        const formatado = pokemons.reduce((acumulator, pokemon) => {
            const tipos = pokemon.types.map(elem => elem.type.name)
            acumulator += `<li class='card ${tipos[0]}'>
            <img class="card-image" id='${pokemon.id}'alt="${pokemon.name}">
            <h2 class='card-title'>${pokemon.name}</h2>
            <p class='card-subtitle'>${tipos.join(' | ')}</p> 
            </li>`
            return acumulator
        }, '') 
           
          const ul =  document.querySelector('.pokedex')
          ul.innerHTML=formatado
         
          for (let i = 1; i <= 150; i++) {
            let imagem = document.getElementById(`${i}`) 
            if (i < 10) {
              imagem.setAttribute('src', `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${i}.png`)
            } else if(i < 100) {
              imagem.setAttribute('src', `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${i}.png`)
            } else{
              imagem.setAttribute('src', `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${i}.png`)
            }
          }
        }).catch(e => console.warn(e))
 
}
 


fetchpokemon()   
    
