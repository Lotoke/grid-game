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
            console.log(tempGrid[tempRow2][tempCol].props.status);
            boxChanged = true;

            tempGrid[tempRow][tempCol] = (
              <BoxSelected
                status={tempGrid[tempRow2][tempCol].props.status}
                key={`${tempRow}${tempCol}`}
                index={`${tempRow}${tempCol}`}
                val={tempGrid[tempRow][tempCol].props.val}
                changeSelectionState={changeSelectionState}
                origin={tempGrid[tempRow2][tempCol].props.origin}
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
                    status={tempGrid[tempRow][tempCol2].props.status}
                    key={`${tempRow}${tempCol}`}
                    index={`${tempRow}${tempCol}`}
                    val={tempGrid[tempRow][tempCol].props.val}
                    changeSelectionState={changeSelectionState}
                    origin={tempGrid[tempRow][tempCol2].props.origin}
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
    var linked = false;
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
    if (props.boxCount >= 0) {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 5; col++) {
          if (`${row}${col}` == index) {
            if (row < 1 || row > 8) {
              var boxOrigin;
              if (row < 1) {
                boxOrigin = 1;
              } else {
                boxOrigin = 2;
              }

              tempGrid[row][col] = (
                <BoxSelected
                  status={"selectedBox"}
                  key={`${row}${col}`}
                  index={`${row}${col}`}
                  val={tempGrid[row][col].props.val}
                  changeSelectionState={changeSelectionState}
                  origin={boxOrigin}
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
              } else {
                if (
                  tempGrid[row][col + 1].props.origin !=
                  tempGrid[row][col].props.origin
                ) {
                  linked = true;
                }
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
              } else {
                if (
                  tempGrid[row][col - 1].props.origin !=
                  tempGrid[row][col].props.origin
                ) {
                  linked = true;
                }
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
              } else {
                if (
                  tempGrid[row + 1][col].props.origin !=
                  tempGrid[row][col].props.origin
                ) {
                  linked = true;
                }
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
              } else {
                if (
                  tempGrid[row - 1][col].props.origin !=
                  tempGrid[row][col].props.origin
                ) {
                  linked = true;
                }
              }
            }
          }
        }
      }
    }
    grid = tempGrid;
    setBoxStatus(tempGrid);
    if (linked == true) {
      props.endGame();
    }

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
