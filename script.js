const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

async function searchPokemon(inputValue) {
  const key = inputValue.toLowerCase();
  const cache = localStorage.getItem(`pokemon-${key}`);
  if (cache) {
    return JSON.parse(cache);
  }
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputValue}`
    );
    if (!response.ok) {
      return { err: true };
    }
    const data = await response.json();
    localStorage.setItem(`pokemon-${key}`, JSON.stringify(data));
    return data;
  } catch (erro) {
    throw erro;
  }
}
async function searchSpecie(inputValue) {
  const key = inputValue.toLowerCase();
  const cache = localStorage.getItem(`pokemon-specie-${key}`);
  if (cache) {
    return JSON.parse(cache);
  }
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${inputValue}/`
    );
    if (!response.ok) {
      return { err: true };
    }
    const data = await response.json();
    localStorage.setItem(`pokemon-specie-${key}`, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}
searchButton.addEventListener("click", async () => {
  if (searchInput.value) {
    document.querySelector("#pok-card").style.display = "none";
    document.querySelector("#spinner").style.display = "flex";
    document.querySelector("#status-msg").style.display = "none";

    const pokeData = await searchPokemon(searchInput.value);
    const pokeSpecieData = await searchSpecie(searchInput.value);
    if (!pokeData.err) {
      const pokeSpriteUrl = pokeData.sprites.front_default;
      const pokeType = pokeData.types[0].type.name;
      const { name, height, weight } = pokeData;
      const color = pokeSpecieData.color.name;

      document.querySelector("#sprite").src = pokeSpriteUrl;
      document.querySelector("#pok-name").style.color = color;
      document.querySelector("#pok-name").innerText = name;
      document.querySelector("#pok-type").innerText = pokeType;
      document.querySelector("#pok-height").innerText = height;
      document.querySelector("#pok-weight").innerText = weight;

      document.querySelector("#pok-card").style.display = "grid";
    } else {
      document.querySelector("#status-msg p").innerText =
        "Pokémon não encontrado";
      document.querySelector("#status-msg").style.display = "block";
    }

    document.querySelector("#spinner").style.display = "none";
  } else {
  }
});
