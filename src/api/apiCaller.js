const getPokemon = async (limit) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    .then((response) => response.json())
    .then(async (rawData) => {
      let NameAndURLs = [];
      for (let i = 0; i < rawData.results.length; i++) {
        const pokemonName = rawData.results[i].name;

        const pokemonFrontDefault = await fetch(rawData.results[i].url)
          .then((response) => response.json())
          .then((fullPokemonData) => {
            let front_default = fullPokemonData.sprites.front_default;
            return front_default;
          });
        NameAndURLs.push({
          name: pokemonName,
          pokemonPicture: pokemonFrontDefault,
        });
      }
      return NameAndURLs;
    });
  return res;
};

const getSpecificPokemon = async (limit) => {
  let results = [];
  for (let index = 1; index < limit + 1; index++) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${index * 3}`
    );
    const data = await response.json();
    results.push({
      name: data.name,
      pokemonPicture: data.sprites.front_default,
    });
  }
  return results;
};
export { getSpecificPokemon };
export default getPokemon;
