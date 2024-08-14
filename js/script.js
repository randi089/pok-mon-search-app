const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imgContainer = document.querySelector(".image-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

button.addEventListener("click", async function () {
  let inputValue = input.value;
  const regex = /[a-z]/gi;
  if (inputValue.length < 1) {
    alert("Pokémon not found");
    return;
  }
  if (regex.test(inputValue)) {
    inputValue = inputValue.toLowerCase();
  }
  try {
    const pokemon = await getPokemon(inputValue);
    updateUI(pokemon);
  } catch (err) {
    console.log(err);
    alert("Pokémon not found");
  }
});

function getPokemon(keyword) {
  return fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response;
    });
}

function updateUI(pokemon) {
  if (Object.hasOwn(pokemon, "count")) {
    alert("Pokémon not found");
  } else {
    pokemonName.innerText = pokemon.name;
    pokemonId.innerText = "#" + pokemon.id;
    height.innerText = `Height: ${pokemon.height}`;
    weight.innerText = `Weight: ${pokemon.weight}`;
    imgContainer.innerHTML = `<img src="${pokemon.sprites["front_default"]}" alt="${pokemon.name}" id="sprite"/>`;
    types.innerHTML = "";
    pokemon.types.forEach((type) => {
      types.innerHTML += `<span class="${type.type.name}">${type.type.name}</span>`;
    });
    hp.innerText = pokemon.stats[0].base_stat;
    attack.innerText = pokemon.stats[1].base_stat;
    defense.innerText = pokemon.stats[2].base_stat;
    specialAttack.innerText = pokemon.stats[3].base_stat;
    specialDefense.innerText = pokemon.stats[4].base_stat;
    speed.innerText = pokemon.stats[5].base_stat;
  }
}
