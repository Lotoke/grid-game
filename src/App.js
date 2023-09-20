import Matrix from "./components/Matrix";
import Box from "./components/Box";
import Grid from "./components/Grid";
import Counter from "./components/Counter";
import "./App.css";
import RowCount from "./components/RowCount";
import { useState, useEffect } from "react";
import BounceElement from "./components/bounce";
import TopNavBar from "./components/TopNavBar";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
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

  const [isBouncing, setIsBouncing] = useState(false);
  const [isClipVisible, setIsClipVisible] = useState(false);
  const [isShareBouncing, setIsShareBouncing] = useState(false);
  const [isBestScore, setIsBestScore] = useState(false);
  //var newRowSum;
  var count = 0;
  var loaded = false;
  var tempBestScore = 0;
  var initDay;
  const handleBounceEffect = () => {
    setIsBouncing(true);

    // Remove the bounce class after the animation is complete
    // setTimeout(() => {
    //setIsBouncing(false);
    // }, 600); // 0.6 seconds, which matches the animation duration
  };

  const handleShare = () => {
    setIsShareBouncing(true);
    setIsClipVisible(true);

    navigator.clipboard.writeText(
      "GridLinker🟪⬜\n          ⬜🟪\n" +
        inputValue +
        "'s Score:" +
        boxCount +
        "\nToday's Lowest Score: " +
        bestScore +
        "\nPlay Now: https://gridlinker.web.app/"
    );

    // Remove the bounce class after the animation is complete
    setTimeout(() => {
      setIsShareBouncing(false);
    }, 600); // 0.6 seconds, which matches the animation duration

    setTimeout(() => {
      setIsClipVisible(false);
    }, 1000); // Adjust the duration of the fade
  };

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
  };

  const openModal = () => {
    handleBounceEffect();
    console.log(tempBestScore);
    if (count < tempBestScore) {
      setIsBestScore(true);
    }

    submitScore();
    fetchBestScore();
    fetchAverageScore();

    setTimeout(() => {
      setGameStatModalStatus(true);
    }, 1100); // 0.6 seconds, which matches the animation duration
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const submitScore = async () => {
    const response = await fetch(
      "https://gridlinker-8e148.ew.r.appspot.com/api/scores",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName: inputValue,
          score: count,
          timestamp: new Date().toISOString(),
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json(); // Parse the JSON response
      console.log(responseData.message); // Display the response message
    }
  };

  const fetchAverageScore = async () => {
    try {
      const response = await fetch(
        "https://gridlinker-8e148.ew.r.appspot.com/api/meanScore"
      );
      const data = await response.json();
      setAverageScore(data.meanScore);
    } catch (error) {
      console.error("Error fetching highest score:", error);
    }
  };

  const fetchBestScore = async () => {
    try {
      const response = await fetch(
        "https://gridlinker-8e148.ew.r.appspot.com/api/bestScore"
      );
      const data = await response.json();
      setBestScore(data.bestScore);
      tempBestScore = data.bestScore;
    } catch (error) {
      console.error("Error fetching highest score:", error);
    }
  };

  const fetchDaySinceInit = async () => {
    try {
      const response = await fetch(
        "https://gridlinker-8e148.ew.r.appspot.com/api/day"
      );
      const data = await response.json();
      initDay = data.day;
    } catch (error) {
      console.error("Error fetching highest day:", error);
    }
  };

  useEffect(() => {
    if (loadStateFromLocalStorage("score") != undefined) {
      count = loadStateFromLocalStorage("score");
      setBoxCount(count);
    }
    setGameFinished(loadStateFromLocalStorage("disableGame"));

    fetchDaySinceInit().then(() => {
      if (initDay > loadStateFromLocalStorage("initDay")) {
        console.log(loadStateFromLocalStorage("initDay"));
        localStorage.clear();
      }
      console.log(initDay);

      saveStateToLocalStorage("initDay", initDay);

      //console.log(loadStateFromLocalStorage(initDay));
      fetchAverageScore();
      fetchBestScore();
    });
  });

  return (
    <div className="main">
      <div>
        <TopNavBar />
      </div>
      <div className="game">
        <ReactModal className="endGameStats" isOpen={gameStatModalStatus}>
          <div>
            <button className="closeButton" onClick={() => closeModal()}>
              &times;
            </button>
            <div className="modalText1">Your Score: {boxCount}</div>
            <div className={isBestScore ? "highScore" : "highScoreHidden"}>
              New Low Score!
            </div>
            <div className="modalText2">Daily Average Score {averageScore}</div>
            <div className="modalText2"> Daily Best Score: {bestScore}</div>

            <form>
              <input
                className="modalText4"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Username"
              />
              <button
                type="button"
                className={
                  isShareBouncing ? "shareButtonBounce" : "shareButton"
                }
                onClick={() => handleShare()}
              >
                <FontAwesomeIcon icon={faShareFromSquare} />
                {" Share"}
              </button>
            </form>
            {isClipVisible && (
              <div className="fadeInOut">Copied to Clipboard</div>
            )}
          </div>
        </ReactModal>

        <div
          className={` ${
            isBouncing ? "revealGameComplete" : "hiddenGameComplete"
          }`}
        >
          {"Puzzle Complete!"}
        </div>
        <div className="topBox">
          <div className="playerScore">Score:</div>
          <Counter counter={boxCount} />
          <div className="playerScore2">Lower is better...</div>
        </div>

        <div className={gameFinished ? "mainContentDisabled" : "mainContent"}>
          <Grid
            updateCounter={updateCounter}
            boxCount={boxCount}
            rowSum={getRowSum}
            endGame={() => {
              setGameFinished(true);
              saveStateToLocalStorage("disableGame", true);

              openModal();
            }}
          />
          <RowCount inputRowSum={newRowSum}></RowCount>
        </div>
        <div
          className={gameFinished ? "bottomBoxButton" : "bottomBox"}
          onClick={() => {
            if (gameFinished) {
              setGameStatModalStatus(true);
            }
          }}
        >
          <div className="pastScores">Daily Average: {averageScore} </div>
          <div className="pastScores">Daily Lowest: {bestScore}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
