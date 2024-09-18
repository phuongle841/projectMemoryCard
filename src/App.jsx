import "./App.css";
import userAction from "./api/apiCaller";
function App() {
  for (let id = 1; id < 3; id++) {
    userAction({ id });
  }
  return <></>;
}

export default App;
