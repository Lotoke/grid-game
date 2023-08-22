import { useState } from "react";

function GridGenerator() {
  var grid = [];
  var sum = 0;

  while (sum !== 200) {
    grid = [];
    sum = 0;

    for (let row = 0; row < 10; row++) {
      grid.push([]);
      for (let col = 0; col < 5; col++) {
        let randomNum = Math.floor(Math.random() * 10);
        grid[row].push(randomNum);
        sum += randomNum;
      }
    }
  }

  return grid;
}

export default GridGenerator;
