import * as math from "mathjs";
import Matrix from "./Matrix";
import React from "react";
import Box from "./Box";
import { useState } from "react";
import "../App";
// Represents a 10 x 18 grid of grid squares

export default function Grid(props) {
  // generates an array of 18 rows, each containing 10 GridSquares.
  const [boxStatus, setBoxStatus] = useState([]);
  const grid = [];

  for (let row = 0; row < 10; row++) {
    grid.push([]);
    for (let col = 0; col < 5; col++) {
      grid[row].push(
        <Box
          status={"unselectedBox"}
          key={`${col}${row}`}
          index={`${col}${row}`}
          val={Math.floor(Math.random() * (11 - 1) + 1)}
          changeSelectionState={changeSelectionState}
        />
      );
    }
  }
  setBoxStatus(grid);
  const changeSelectionState = ()=> {
    for (let row = 0; row < 10; row++) {
      grid.push([]);
      for (let col = 0; col < 5; col++) {
        if ('${col}${row}' == index ){
          //delete present box and replace with new box with 'selectedBox' status
      }
    }
    setBoxStatus(grid);
  }
  // The components generated in makeGrid are rendered in div.grid-board
 
  return <div className="gridBoard">{grid}</div>;
}
