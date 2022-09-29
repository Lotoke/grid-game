import Matrix from "./components/Matrix";
import Box from "./components/Box";
import Grid from "./components/Grid";
import Counter from "./components/Counter";
import "./App.css";
import RowCount from "./components/RowCount";
import { useState } from "react";
function App() {
  const [boxCount, setBoxCount] = useState(50);
  const [newRowSum, setNewRowSum] = useState([]);
  //var newRowSum;
  var count = 50;

  const updateCounter = (val) => {
    count = count - val;
    setBoxCount(count);
  };
  const getRowSum = (rowSum) => {
    //setNewRowSum(rowSum);
    setNewRowSum(rowSum);
  };
  return (
    <div>
      <div>
        <button className="button" onClick={Matrix}>
          test
        </button>
        <Counter counter={boxCount} />
      </div>
      <div className="mainContent">
        <Grid
          updateCounter={updateCounter}
          boxCount={boxCount}
          rowSum={getRowSum}
        />
        <RowCount inputRowSum={newRowSum}></RowCount>
      </div>
    </div>
  );
}

export default App;
