import { useState } from "react";

function GridGenerator(props) {
  var grid = [];
  for (let row = 0; row < 10; row++) {
    grid.push([]);
    for (let col = 0; col < 5; col++) {
      grid[row].push(Math.floor(Math.random() * (11 - 1) + 1));
    }
  }
  return grid;
}

export default GridGenerator;
