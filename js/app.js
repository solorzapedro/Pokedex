'use strict'

const items = document.getElementById('items');
const template = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

//Espero a que se cargue todo el HTML, luego ejecuta la fetchData
document.addEventListener('DOMContentLoaded', () => {
    fetchPokemon();
});

const fetchPokemon = async () => {
    const pokemones = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const res = await fetch(url);
        const dataPokemon = await res.json();
        pokemones.push(dataPokemon);
    }
    
    const listaPokemon = pokemones.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(' - '),
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat
    }));

    pintarCard(listaPokemon);
}

const pintarCard = (listaPokemon) => {
    const flex = document.querySelector('.flex');
    listaPokemon.forEach(poke => {        
        const clone = template.cloneNode(true);

        clone.querySelector('.card-body-img').setAttribute('src', poke.image);
        clone.querySelector('.card-body-nombre').innerHTML = `${poke.name} <span>${poke.hp} hp</span>`
        clone.querySelector('.card-body-text').textContent = poke.type;

        //TODO Cambiar nombre de social por stats, también hacerlo en html y sass
        clone.querySelectorAll('.card-footer-social h3')[0].textContent = poke.attack;
        clone.querySelectorAll('.card-footer-social h3')[1].textContent = poke.defense;
        clone.querySelectorAll('.card-footer-social h3')[2].textContent = poke.speed;
        fragment.appendChild(clone);
    })    
    flex.appendChild(fragment);
}