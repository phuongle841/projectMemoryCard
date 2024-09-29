import { randomIntFromInterval } from "../utils/randomIntFromInterval";

const getSpecificPokemon = async (limit, lowerBounder, upperBounder) => {
  let idArray = getRandomNumberArray(limit, lowerBounder, upperBounder);
  let results = [];
  for (let index = 1; index < limit + 1; index++) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${idArray[index - 1]}`
    );
    const data = await response.json();
    results.push({
      name: data.name,
      pokemonPicture: data.sprites.front_default,
    });
  }
  return results;
};

function getRandomNumberArray(length, lowerBounder, upperBounder) {
  const results = [];
  while (results.length < length) {
    const nextNumber = randomIntFromInterval(lowerBounder, upperBounder);
    results.push(nextNumber);
  }
  return results;
}

export { getSpecificPokemon };
