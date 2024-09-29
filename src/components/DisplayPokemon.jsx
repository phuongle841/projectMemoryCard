import Card from "./Card";
export function DisplayPokemon({ data, onSuccessPath, onFailPath }) {
  return (
    <>
      {Object.keys(data).map((index) => {
        return (
          <Card
            samplePokemon={data}
            id={index}
            onSuccessPath={onSuccessPath}
            onFailPath={onFailPath}
            key={data[index].name}
            name={data[index].name}
            url={data[index].pokemonPicture}
          ></Card>
        );
      })}
    </>
  );
}
