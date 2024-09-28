export default function Card({
  samplePokemon,
  id,
  onSuccessPath,
  onFailPath,
  name,
  url,
}) {
  function handleOnClick() {
    if (!samplePokemon[id].clicked) {
      samplePokemon[id].clicked = true;
      onSuccessPath(samplePokemon);
    } else {
      onFailPath(samplePokemon);
    }
  }
  return (
    <div className="card" onClick={handleOnClick}>
      <p>{name}</p>
      <img src={url} alt="" />
    </div>
  );
}
