import Matrix from "./components/Matrix";
import Box from "./components/Box"
import Grid from "./components/Grid"
import './App.css';
function App() {
  return (
    <div>
      <h1>Button Test</h1>
      <div>
        <button className= 'button' onClick={Matrix}>test</button>
      </div>
      <div>
      <Grid/>
      </div>
    </div>
  );
}

export default App;
