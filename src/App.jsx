import { useEffect, useState } from "react";
import "./App.css";
import "./style/card.css";
import getPokemon, { getSpecificPokemon } from "./api/apiCaller";
import Card from "./components/Card";

function App() {
  let [samplePokemon, setSamplePokemon] = useState(null);
  useEffect(function () {
    let ignore = false;
    setSamplePokemon(null);
    getSpecificPokemon(10).then((data) => {
      if (!ignore) {
        addClickState(data);
        setSamplePokemon(data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  function addClickState(data) {
    data.forEach((element) => {
      const clicked = false;
      element.clicked = clicked;
    });
  }

  function setSampleProcedure(data) {
    const newData = [...data];
    randomSample(newData);
  }

  function randomSample(data) {
    const newData = [];
    while (data.length != 0) {
      const randomNumber = randomIntFromInterval(0, data.length - 1);
      let oldElement = data.splice(randomNumber, 1);
      console.log(oldElement);
      newData.push(oldElement[0]);
    }
    setSamplePokemon(newData);
  }
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div className="board">
      {samplePokemon !== null ? (
        <DisplayPokemon
          data={samplePokemon}
          setSampleProcedure={setSampleProcedure}
        ></DisplayPokemon>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}

function DisplayPokemon({ data, setSampleProcedure }) {
  return (
    <>
      {Object.keys(data).map((index) => {
        return (
          <Card
            samplePokemon={data}
            id={index}
            setSampleProcedure={setSampleProcedure}
            key={data[index].name}
            name={data[index].name}
            url={data[index].pokemonPicture}
          ></Card>
        );
      })}
    </>
  );
}
export default App;
