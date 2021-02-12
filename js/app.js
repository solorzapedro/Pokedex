'use strict'

//Mensaje para comprobar si se carga el JS
console.log("En la consola");

//Espero a que se cargue todo el HTML, luego ejecuta la fetchData
document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    fetchData(random);
});

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}



const fetchData = async (idPokemon) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const dataPokemon = await res.json();

        console.log(dataPokemon);

        const pokemon = {
            img: dataPokemon.sprites.front_default,
            nombre: dataPokemon.name,
            hp: dataPokemon.stats[0].base_stat,
            attack: dataPokemon.stats[1].base_stat,
            defense: dataPokemon.stats[2].base_stat,
            speed:dataPokemon.stats[5].base_stat
        }

        pintarCard(pokemon);

    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) => {
    console.log(pokemon);

    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    //clone.querySelector('.card-body-img').setAttribute('src', pokemon.sprites.other.dream_world.front_default);
    clone.querySelector('.card-body-nombre').innerHTML = `${(pokemon.nombre)} <span>${pokemon.hp} hp</span>`
    //TODO Cambiar nombre de social por stats, también hacerlo en html y sass
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack;
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.defense;
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.speed;

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}