import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import * as math from "mathjs";
import { useState } from "react";
import "../App";
import Grid from "./Grid";
import GridUpdater from "./GridUpdater";

function RowCountBox(props) {
  //let box = document.createElement('div');

  return (
    <div className={"rowCountBox"}>
      <div>{props.val}</div>
    </div>
  );
}

export default RowCountBox;
