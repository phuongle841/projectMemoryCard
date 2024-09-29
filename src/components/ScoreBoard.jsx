export function ScoreBoard({ score, name }) {
  return (
    <div className="scoreBoard">
      <p>
        {name} <span>{score}</span>
      </p>
    </div>
  );
}
