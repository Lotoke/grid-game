import Matrix from "./components/Matrix";
import Box from "./components/Box"
import Grid from "./components/Grid"
import Counter from "./components/Counter"
import './App.css';
import {useState} from 'react';
function App() {
  const [boxCount, setBoxCount] = useState(50);
  var count = 50;

  const updateCounter = (val) => {
    count = count -val;
    setBoxCount(count);
  }
  return (
    <div>
      
      <div>
        <button className= 'button' onClick={Matrix}>test</button>
        <Counter counter= {boxCount} />
      </div>
      <div>
      <Grid updateCounter= {updateCounter} boxCount={boxCount}/>
      </div>
    </div>
  );
}

export default App;
