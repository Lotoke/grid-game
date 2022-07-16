import * as math from "mathjs";
import Matrix from "./Matrix";
import React from "react";
import Box from "./Box";
import HiddenBox from "./HiddenBox"
import BoxSelected from "./BoxSelected";
import BoxRevealed from "./BoxRevealed"
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

  const changeSelectionState = (index,val) => {
    //console.log(boxStatus.slice());
    //console.log(boxStatus);
    //let grid2 = [...grid];
    //var grid3 = structuredClone(boxStatus);

    var tempGrid = cloneDeep(grid);

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 5; col++) {
        if (`${row}${col}` == index) {
          
          tempGrid[row][col] = (
            <BoxSelected
              status={"selectedBox"}
              key={`${row}${col}`}
              index={`${row}${col}`}
              val={tempGrid[row][col].props.val}
              changeSelectionState={changeSelectionState}
            />
            
          );
          tempGrid[row][col+1] = (
            <BoxRevealed
              status={"selectedBox"}
              key={`${row}${col+1}`}
              index={`${row}${col+1}`}
              val={tempGrid[row][col+1].props.val}
              changeSelectionState={changeSelectionState}
            />
          );
          tempGrid[row][col-1] = (
            <BoxRevealed
              status={"selectedBox"}
              key={`${row}${col-1}`}
              index={`${row}${col-1}`}
              val={tempGrid[row][col-1].props.val}
              changeSelectionState={changeSelectionState}
            />
          );

          tempGrid[row+1][col] = (
            <BoxRevealed
              status={"selectedBox"}
              key={`${row+1}${col}`}
              index={`${row+1}${col}`}
              val={tempGrid[row][col].props.val}
              changeSelectionState={changeSelectionState}
            />
          );

          tempGrid[row-1][col] = (
            <BoxRevealed
              status={"selectedBox"}
              key={`${row-1}${col}`}
              index={`${row-1}${col}`}
              val={tempGrid[row-1][col].props.val}
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
          <HiddenBox
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
