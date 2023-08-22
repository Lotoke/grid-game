import Matrix from "./components/Matrix";
import Box from "./components/Box";
import Grid from "./components/Grid";
import Counter from "./components/Counter";
import "./App.css";
import RowCount from "./components/RowCount";
import { useState } from "react";
import Popup from "reactjs-popup";
import ReactModal from "react-modal";
function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [newRowSum, setNewRowSum] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameStatModalStatus, setGameStatModalStatus] = useState(false);
  //var newRowSum;
  var count = 0;
  const updateCounter = (val) => {
    count = count + val;
    setBoxCount(count);
  };
  const getRowSum = (rowSum) => {
    //setNewRowSum(rowSum);
    setNewRowSum(rowSum);
  };

  const closeModal = () => {
    setGameStatModalStatus(false);
  };
  const openModal = () => {
    setGameStatModalStatus(true);
  };
  return (
    <div className="main">
      <Counter counter={boxCount} />
      <div>Daily Average</div>
      <div>Daily Best</div>
      <ReactModal className="endGameStats" isOpen={gameStatModalStatus}>
        <div>
          <div className="heading2">Puzzle Complete!</div>

          <button className="closeButton" onClick={() => closeModal()}>
            &times;
          </button>
          <Counter counter={boxCount} />
        </div>
      </ReactModal>

      <div className={gameFinished ? "mainContentDisabled" : "mainContent"}>
        <Grid
          updateCounter={updateCounter}
          boxCount={boxCount}
          rowSum={getRowSum}
          endGame={() => {
            setGameFinished(true);
            openModal();
          }}
        />
        <RowCount inputRowSum={newRowSum}></RowCount>
      </div>
    </div>
  );
}

export default App;
