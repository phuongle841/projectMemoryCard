export default function Card({
  samplePokemon,
  id,
  setSampleProcedure,
  name,
  url,
}) {
  function handleOnClick() {
    if (!samplePokemon[id].clicked) {
      samplePokemon[id].clicked = true;
      setSampleProcedure(samplePokemon);
    }
  }
  return (
    <div className="card" onClick={handleOnClick}>
      <p>{name}</p>
      <img src={url} alt="" />
    </div>
  );
}
