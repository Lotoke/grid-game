import Matrix from "./components/Matrix";
import Box from "./components/Box";
import Grid from "./components/Grid";
import Counter from "./components/Counter";
import "./App.css";
import RowCount from "./components/RowCount";
import { useState, useEffect } from "react";

import ReactModal from "react-modal";
function App() {
  const saveStateToLocalStorage = (ref, state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(ref, serializedState);
    } catch (error) {
      // Handle errors
    }
  };

  const loadStateFromLocalStorage = (ref) => {
    try {
      const serializedState = localStorage.getItem(ref);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };

  const [boxCount, setBoxCount] = useState(0);
  const [newRowSum, setNewRowSum] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameStatModalStatus, setGameStatModalStatus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  //var newRowSum;
  var count = 0;
  var loaded = false;

  const updateCounter = (val) => {
    count = count + val;
    setBoxCount(count);
    saveStateToLocalStorage("score", count);
  };
  const getRowSum = (rowSum) => {
    //setNewRowSum(rowSum);
    setNewRowSum(rowSum);
  };

  const closeModal = () => {
    setGameStatModalStatus(false);
    submitScore();
    fetchBestScore();
    fetchAverageScore();
  };

  const openModal = () => {
    setGameStatModalStatus(true);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const submitScore = async () => {
    const response = await fetch("http://localhost:4000/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerName: inputValue,
        score: boxCount,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      const responseData = await response.json(); // Parse the JSON response
      console.log(responseData.message); // Display the response message
    }
  };

  const fetchAverageScore = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/meanScore");
      const data = await response.json();
      console.log("Best Score:", data.meanScore);
      setAverageScore(data.meanScore);
    } catch (error) {
      console.error("Error fetching highest score:", error);
    }
  };

  const fetchBestScore = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/bestScore");
      const data = await response.json();
      console.log("Best Score:", data.bestScore);
      setBestScore(data.bestScore);
    } catch (error) {
      console.error("Error fetching highest score:", error);
    }
  };

  useEffect(() => {
    if (loadStateFromLocalStorage("score") != undefined) {
      count = loadStateFromLocalStorage("score");
      setBoxCount(count);
    }
    fetchAverageScore();
    fetchBestScore();
  });

  return (
    <div className="main">
      <Counter counter={boxCount} />
      <div>Daily Average {averageScore} </div>
      <div>Daily Best: {bestScore}</div>

      <ReactModal className="endGameStats" isOpen={gameStatModalStatus}>
        <div>
          <div className="heading2">Puzzle Complete!</div>

          <button className="closeButton" onClick={() => closeModal()}>
            &times;
          </button>
          <Counter counter={boxCount} />
          <div> Daily Average Score {averageScore}</div>
          <div> Daily Best Score: {bestScore}</div>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={() => closeModal()}>Submit</button>
            </label>
          </form>
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
