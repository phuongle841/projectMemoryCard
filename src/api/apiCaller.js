const getPokemon = async ({ id }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, sprites } = await res.json();
  const image = sprites["front_default"];
  console.log(name, sprites);

  return { name, image };
};
export default getPokemon;
