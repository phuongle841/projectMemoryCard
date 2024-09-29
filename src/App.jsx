import { useEffect, useState } from "react";
import "./App.css";
import "./style/card.css";
import { getSpecificPokemon } from "./api/apiCaller";
import { LevelBoard } from "./components/LevelBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { DisplayPokemon } from "./components/DisplayPokemon";
import { randomIntFromInterval } from "./utils/randomIntFromInterval";

function App() {
  const lowerBounder = 0,
    upperBounder = 800;
  let [level, setLevel] = useState(5);
  let [currentScore, setCurrentScore] = useState(0);
  let [bestScore, setBestScore] = useState(0);
  let [samplePokemon, setSamplePokemon] = useState(null);
  useEffect(
    function () {
      let ignore = false;
      setSamplePokemon(null);
      getSpecificPokemon(level, lowerBounder, upperBounder).then((data) => {
        if (!ignore) {
          addClickState(data);
          setSamplePokemon(data);
        }
      });
      return () => {
        ignore = true;
      };
    },
    [level]
  );

  function addClickState(data) {
    data.forEach((element) => {
      const clicked = false;
      element.clicked = clicked;
    });
  }

  function onSuccessPath(data) {
    setSampleProcedure(data);
    setCurrentScore(currentScore + 1);
    currentScore + 1 > bestScore && setBestScore(currentScore + 1);
    currentScore + 1 == level && winNotification();
  }
  function winNotification() {
    alert("Congrats, you beat the game!!!");
  }

  function onFailPath(data) {
    failNotification();
    addClickState(data);
    setSampleProcedure(data);
    setCurrentScore(0);
  }

  function failNotification() {
    alert("Better Next Time!");
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
      newData.push(oldElement[0]);
    }
    setSamplePokemon(newData);
  }

  function getNewPatchPokemon() {
    setSamplePokemon(null);
    getSpecificPokemon(level, lowerBounder, upperBounder).then((data) => {
      addClickState(data);
      setSamplePokemon(data);
    });
    setCurrentScore(0);
  }

  return (
    <div>
      <h1>Memory card game</h1>
      <div className="status">
        <h2>current level: {level}</h2>
        <h3>
          <button onClick={getNewPatchPokemon}>get new batch</button>
        </h3>
        <div>
          <LevelBoard setLevel={setLevel} level={5}></LevelBoard>
          <LevelBoard setLevel={setLevel} level={10}></LevelBoard>
          <LevelBoard setLevel={setLevel} level={15}></LevelBoard>
        </div>
      </div>
      <ScoreBoard score={currentScore} name={"current: "}></ScoreBoard>
      <ScoreBoard score={bestScore} name={"best score: "}></ScoreBoard>

      <div className="board">
        {samplePokemon !== null ? (
          <DisplayPokemon
            data={samplePokemon}
            onSuccessPath={onSuccessPath}
            onFailPath={onFailPath}
          ></DisplayPokemon>
        ) : (
          <p>...loading</p>
        )}
      </div>
    </div>
  );
}

export default App;
