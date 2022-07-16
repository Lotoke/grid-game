import * as math from "mathjs";
import Matrix from "./Matrix";
import React from "react";
import Box from "./Box";
import BoxSelected from "./BoxSelected";
import { useRef, useState, useEffect } from "react";
import "../App";
import cloneDeep from "lodash.clonedeep";
// Represents a 10 x 18 grid of grid squares

export default function Grid(props) {
  // generates an array of 18 rows, each containing 10 GridSquares.
  const [boxStatus, setBoxStatus] = useState([]);
  const [tempBoxStatus, setTempBoxStatus] = useState([]);
  var grid = [];

  var tempGrid = [];
  var changed = false;

  const changeSelectionState = (index) => {
    //console.log(boxStatus.slice());
    //console.log(boxStatus);
    //let grid2 = [...grid];
    //var grid3 = structuredClone(boxStatus);

    var tempGrid = cloneDeep(grid);

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 5; col++) {
        if (`${row}${col}` == index) {
          tempGrid[row][col] = (
            <Box
              status={"selectedBox"}
              key={`${row}${col}`}
              index={`${row}${col}`}
              val={Math.floor(Math.random() * (11 - 1) + 1)}
              changeSelectionState={changeSelectionState}
            />
          );
        }
      }
    }

    grid = tempGrid;
    setBoxStatus(tempGrid);
    //console.log(grid3);
    // The components generated in makeGrid are rendered in div.grid-board
  };

  useEffect(() => {
    for (let row = 0; row < 10; row++) {
      grid.push([]);
      for (let col = 0; col < 5; col++) {
        grid[row].push(
          <Box
            status={"unselectedBox"}
            key={`${row}${col}`}
            index={`${row}${col}`}
            val={Math.floor(Math.random() * (11 - 1) + 1)}
            changeSelectionState={changeSelectionState}
          />
        );
      }
    }

    setBoxStatus(grid);
  }, []);

  return <div className="gridBoard">{boxStatus}</div>;
}
