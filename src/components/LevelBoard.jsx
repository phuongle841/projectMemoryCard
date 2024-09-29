export function LevelBoard({ setLevel, level }) {
  function onSetLevel() {
    setLevel(level);
  }
  return <button onClick={onSetLevel}>{level}</button>;
}
