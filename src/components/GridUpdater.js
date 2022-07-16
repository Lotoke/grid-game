import * as math from "mathjs";
import Matrix from "./Matrix";
import React from "react";
import Box from "./Box";
import { useState } from "react";
import "../App";
// Represents a 10 x 18 grid of grid squares

export default function GridUpdater(index) {
  // generates an array of 18 rows, each containing 10 GridSquares.

  const [boxStatus, setBoxStatus] = useState([]);
  const grid = [];
  for (let row = 0; row < 10; row++) {
    grid.push([]);

    for (let col = 0; col < 5; col++) {
      if (`${col}${row}` == index) {
        grid[row].push("selectedBox");
      } else {
        grid[row].push("unselectedBox");
      }
    }
  }
  setBoxStatus(grid);

  // The components generated in makeGrid are rendered in div.grid-board
}
