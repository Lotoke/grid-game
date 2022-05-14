import * as math from "mathjs";
import Matrix from "./Matrix";
import React from "react";
import Box from "./Box";
import "../App";
// Represents a 10 x 18 grid of grid squares

export default function Grid(props) {
  // generates an array of 18 rows, each containing 10 GridSquares.

  const grid = [];
  for (let row = 0; row < 10; row++) {
    grid.push([]);
    for (let col = 0; col < 5; col++) {
      grid[row].push(
        <Box
          key={`${col}${row}`}
          val={Math.floor(Math.random() * (11 - 1) + 1)}
        />
      );
    }
  }

  // The components generated in makeGrid are rendered in div.grid-board

  return <div className="gridBoard">{grid}</div>;
}
