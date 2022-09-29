import * as math from "mathjs";
import Matrix from "./Matrix";
import React from "react";
import Box from "./Box";
import HiddenBox from "./HiddenBox";
import BoxSelected from "./BoxSelected";
import BoxRevealed from "./BoxRevealed";
import BoxSelectedOutline from "./BoxSelectedOutline";
import { useRef, useState, useEffect } from "react";
import "../App";
import cloneDeep from "lodash.clonedeep";
import GridGenerator from "./GridGenerator";
import { e } from "mathjs";
// Represents a 10 x 18 grid of grid squares

export default function Grid(props) {
  // generates an array of 18 rows, each containing 10 GridSquares.
  const [boxStatus, setBoxStatus] = useState([]);
  const [tempBoxStatus, setTempBoxStatus] = useState([]);
  var grid = [];

  var tempGrid = [];
  var changed = false;
  var boxOutlineArray = [];

  const chooseNextBox = (row, col, tempGrid) => {
    var chooseSelectedBox = false;
    var surroundingBoxes = [];

    // for (let tempRow = row - 1; tempRow <= row + 1; tempRow++) {
    //   if (
    //     tempGrid[tempRow][col].props.status == "selectedBox" ||
    //     tempGrid[tempRow][col].props.status == "selectedBoxOutline"
    //   ) {
    //     surroundingBoxes.push(tempGrid[tempRow][col]);
    //   }
    // }

    // for (let tempCol = col - 1; tempCol <= col + 1; tempCol++) {
    //   if (tempCol > 0 && tempCol < 4) {
    //     if (
    //       tempGrid[row][tempCol].props.status == "selectedBox" ||
    //       tempGrid[row][tempCol].props.status == "selectedBoxOutline"
    //     ) {
    //       surroundingBoxes.push(tempGrid[row][tempCol]);
    //     }
    //   }
    // }

    // for (let i = 0; i < surroundingBoxes.length; i++) {
    //   if (surroundingBoxes[i].props.status == "selectedBox") {
    //     chooseSelectedBox = true;

    //     surroundingBoxes.splice(i, i + 1);
    //   }
    // }
    // if (chooseSelectedBox) {
    //   tempGrid[row][col] = (
    //     <BoxSelected
    //       status={"selectedBox"}
    //       key={`${row}${col}`}
    //       index={`${row}${col}`}
    //       val={tempGrid[row][col].props.val}
    //       changeSelectionState={changeSelectionState}
    //     />
    //   );
    // }

    // if (chooseSelectedBox == false) {
    tempGrid[row][col] = (
      <BoxSelectedOutline
        status={"selectedBoxOutline"}
        key={`${row}${col}`}
        index={`${row}${col}`}
        val={tempGrid[row][col].props.val}
        changeSelectionState={changeSelectionState}
      />
    );
    boxOutlineArray.push(
      <BoxSelectedOutline
        status={"selectedBoxOutline"}
        key={`${row}${col}`}
        index={`${row}${col}`}
        val={tempGrid[row][col].props.val}
        changeSelectionState={changeSelectionState}
      />
    );
    //}
    updateBoxes(tempGrid, boxOutlineArray);
    // tempGrid[row][col] = (
    //   <BoxSelected
    //     status={"selectedBox"}
    //     key={`${row}${col}`}
    //     index={`${row}${col}`}
    //     val={tempGrid[row][col].props.val}
    //     changeSelectionState={changeSelectionState}
    //   />
    // );
  };
  const updateBoxes = (tempGrid, boxOutlineArray) => {
    var boxChanged = true;
    var tempRow;
    var tempCol;
    var x = 0;
    var selectedFound;

    while (boxChanged) {
      boxChanged = false;
      x = x + 1;

      for (var i = 0; i < boxOutlineArray.length; i++) {
        console.log(i);
        tempRow = parseInt(boxOutlineArray[i].props.index[0]);
        tempCol = parseInt(boxOutlineArray[i].props.index[1]);
        selectedFound = false;
        for (var tempRow2 = tempRow - 1; tempRow2 < tempRow + 2; tempRow2++) {
          if (tempGrid[tempRow2][tempCol].props.status == "selectedBox") {
            boxChanged = true;

            tempGrid[tempRow][tempCol] = (
              <BoxSelected
                status={"selectedBox"}
                key={`${tempRow}${tempCol}`}
                index={`${tempRow}${tempCol}`}
                val={tempGrid[tempRow][tempCol].props.val}
                changeSelectionState={changeSelectionState}
              />
            );
            selectedFound = true;

            boxOutlineArray.splice(i, 1);

            break;
          }
        }

        if (selectedFound == false) {
          for (var tempCol2 = tempCol - 1; tempCol2 < tempCol + 2; tempCol2++) {
            if (tempCol2 > -1 && tempCol2 < 5) {
              if (tempGrid[tempRow][tempCol2].props.status == "selectedBox") {
                boxChanged = true;

                tempGrid[tempRow][tempCol] = (
                  <BoxSelected
                    status={"selectedBox"}
                    key={`${tempRow}${tempCol}`}
                    index={`${tempRow}${tempCol}`}
                    val={tempGrid[tempRow][tempCol].props.val}
                    changeSelectionState={changeSelectionState}
                  />
                );

                boxOutlineArray.splice(i, 1);

                break;
              }
            }
          }
        }
        //console.log(boxOutlineArray);
      }
    }
    console.log(boxOutlineArray);
  };
  const changeSelectionState = (index, val) => {
    //console.log(boxStatus.slice());
    //console.log(boxStatus);
    //let grid2 = [...grid];
    //var grid3 = structuredClone(boxStatus);

    var newGrid = GridGenerator();
    var colCount = 0;
    var colCountArray = [];
    for (let row = 0; row < 10; row++) {
      colCount = 0;
      for (let col = 0; col < 5; col++) {
        colCount = colCount + grid[row][col].props.val;
      }
      colCountArray.push(colCount);
    }

    props.rowSum(colCountArray);

    var tempGrid = cloneDeep(grid);
    if (props.boxCount > 0) {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 5; col++) {
          if (`${row}${col}` == index) {
            if (row < 1 || row > 8) {
              tempGrid[row][col] = (
                <BoxSelected
                  status={"selectedBox"}
                  key={`${row}${col}`}
                  index={`${row}${col}`}
                  val={tempGrid[row][col].props.val}
                  changeSelectionState={changeSelectionState}
                />
              );
              updateBoxes(tempGrid, boxOutlineArray);
            } else {
              tempGrid[row][col] = (
                <BoxSelectedOutline
                  status={"selectedBoxOutline"}
                  key={`${row}${col}`}
                  index={`${row}${col}`}
                  val={tempGrid[row][col].props.val}
                  changeSelectionState={changeSelectionState}
                />
              );
              boxOutlineArray.push(
                <BoxSelectedOutline
                  status={"selectedBoxOutline"}
                  key={`${row}${col}`}
                  index={`${row}${col}`}
                  val={tempGrid[row][col].props.val}
                  changeSelectionState={changeSelectionState}
                />
              );

              updateBoxes(tempGrid, boxOutlineArray);
            }

            props.updateCounter(tempGrid[row][col].props.val);
            if (col + 1 < 5) {
              if (
                tempGrid[row][col + 1].props.status != "selectedBox" &&
                tempGrid[row][col + 1].props.status != "selectedBoxOutline"
              ) {
                tempGrid[row][col + 1] = (
                  <BoxRevealed
                    status={"revealedBox"}
                    key={`${row}${col + 1}`}
                    index={`${row}${col + 1}`}
                    val={tempGrid[row][col + 1].props.val}
                    changeSelectionState={changeSelectionState}
                  />
                );
              }
            }
            if (col - 1 > -1) {
              if (
                tempGrid[row][col - 1].props.status != "selectedBox" &&
                tempGrid[row][col - 1].props.status != "selectedBoxOutline"
              ) {
                tempGrid[row][col - 1] = (
                  <BoxRevealed
                    status={"revealedBox"}
                    key={`${row}${col - 1}`}
                    index={`${row}${col - 1}`}
                    val={tempGrid[row][col - 1].props.val}
                    changeSelectionState={changeSelectionState}
                  />
                );
              }
            }
            if (row + 1 < 10) {
              if (
                tempGrid[row + 1][col].props.status != "selectedBox" &&
                tempGrid[row + 1][col].props.status != "selectedBoxOutline"
              ) {
                tempGrid[row + 1][col] = (
                  <BoxRevealed
                    status={"revealedBox"}
                    key={`${row + 1}${col}`}
                    index={`${row + 1}${col}`}
                    val={tempGrid[row + 1][col].props.val}
                    changeSelectionState={changeSelectionState}
                  />
                );
              }
            }
            if (row - 1 > -1) {
              if (
                tempGrid[row - 1][col].props.status != "selectedBox" &&
                tempGrid[row - 1][col].props.status != "selectedBoxOutline"
              ) {
                tempGrid[row - 1][col] = (
                  <BoxRevealed
                    status={"revealedBox"}
                    key={`${row - 1}${col}`}
                    index={`${row - 1}${col}`}
                    val={tempGrid[row - 1][col].props.val}
                    changeSelectionState={changeSelectionState}
                  />
                );
              }
            }
          }
        }
      }
    }
    grid = tempGrid;
    setBoxStatus(tempGrid);

    //console.log(grid3);
    // The components generated in makeGrid are rendered in div.grid-board
  };

  useEffect(() => {
    var newGrid = GridGenerator();
    var colCount = 0;
    var colCountArray = [];
    for (let row = 0; row < 10; row++) {
      grid.push([]);
      for (let col = 0; col < 5; col++) {
        grid[row].push(
          <HiddenBox
            status={"unselectedBox"}
            key={`${row}${col}`}
            index={`${row}${col}`}
            //val={Math.floor(Math.random() * (11 - 1) + 1)}
            val={newGrid[row][col]}
            changeSelectionState={changeSelectionState}
          />
        );
      }
    }

    setBoxStatus(grid);
  }, []);

  return <div className="gridBoard">{boxStatus}</div>;
}
