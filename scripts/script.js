import { getAllPokemon, getOnePokemonSprite, getOnePokemon } from "./api.js";

async function createPokemonImage(url) {
  const pokemonImage = document.createElement("img");
  pokemonImage.src = await getOnePokemonSprite(url);
  return pokemonImage;
}

function createPokemonLink(name, url) {
  const pokemonLink = document.createElement("a");
  pokemonLink.href = url;
  pokemonLink.textContent = name;
  return pokemonLink;
}

async function createPokemon(name, url) {
  const newPokemon = document.createElement("div");
  newPokemon.appendChild(await createPokemonImage(url));
  newPokemon.appendChild(document.createElement("br"));
  newPokemon.appendChild(createPokemonLink(name, url));

  return newPokemon;
}



function searchPokemon(event) {
  console.log(event)
  if (event.code === "Enter" || event.type === "click") {
    const term=document.getElementById("searchField").value;
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
    const root = document.getElementById("root");
    root.innerHTML=''
    createPokemon(term, url).then(
      newPokemon => root.appendChild(newPokemon)
    )
    //getOnePokemon(term)
    //  .then(pokemon => console.log(pokemon))
  }
}

function createSearchField() {
  const searchField = document.createElement("input")
  searchField.id = "searchField"
  searchField.type="text"
  searchField.placeholder="Search"
  searchField.addEventListener("keyup", searchPokemon)
  return searchField;
}

 const createButton = () => {
  const button = document.createElement("button")
  button.appendChild(document.createTextNode("Search"))
  button.onclick = searchPokemon;
  return button;
}




async function init() {
  const root = document.getElementById("root");
  const searchField = createSearchField();


  document.body.insertBefore(searchField, root)
  searchField.insertAdjacentElement("afterend", createButton())

  const pokemon = await getAllPokemon();

  pokemon.forEach(async ({ name, url }) => {
    root.appendChild(await createPokemon(name, url))
  });
}

init();
