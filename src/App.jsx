import { useEffect, useState } from "react";
import "./App.css";
import "./style/card.css";
import { getSpecificPokemon } from "./api/apiCaller";
import Card from "./components/Card";

function App() {
  let [level, setLevel] = useState(5);
  let [currentScore, setCurrentScore] = useState(0);
  let [bestScore, setBestScore] = useState(0);
  let [samplePokemon, setSamplePokemon] = useState(null);
  useEffect(
    function () {
      let ignore = false;
      setSamplePokemon(null);
      getSpecificPokemon(level).then((data) => {
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
    if (currentScore + 1 > bestScore) {
      setBestScore(currentScore + 1);
    }
    if (currentScore + 1 == level) {
      winNotification();
    }
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
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div>
      <div>
        <LevelBoard setLevel={setLevel} level={5}></LevelBoard>
        <LevelBoard setLevel={setLevel} level={10}></LevelBoard>
        <LevelBoard setLevel={setLevel} level={15}></LevelBoard>
      </div>
      <ScoreBoard score={currentScore} name={"current"}></ScoreBoard>
      <ScoreBoard score={bestScore} name={"best score"}></ScoreBoard>

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

function ScoreBoard({ score, name }) {
  return (
    <div className="scoreBoard">
      <p>
        {name} board:
        <span>{score}</span>
      </p>
    </div>
  );
}

function LevelBoard({ setLevel, level }) {
  function onSetLevel() {
    setLevel(level);
  }
  return <button onClick={onSetLevel}>{level}</button>;
}

function DisplayPokemon({ data, onSuccessPath, onFailPath }) {
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
export default App;
