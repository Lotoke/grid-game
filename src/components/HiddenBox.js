import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import * as math from "mathjs";
import { useState } from "react";
import "../App";
import Grid from "./Grid";
import GridUpdater from "./GridUpdater";

function HiddenBox(props) {
  //let box = document.createElement('div');
  const [boxColour, setBoxColour] = useState(props.status);

  const onClickEvent = () => {
    
    props.changeSelectionState(props.index);
  };

  return (
    <div onClick={onClickEvent} className={"hiddenBox"}>
      <div></div>
    </div>
  );
}

export default HiddenBox;