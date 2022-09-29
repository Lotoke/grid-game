import * as math from "mathjs";
import { useState } from "react";
import "../App";
import Grid from "./Grid";
import GridUpdater from "./GridUpdater";

function BoxSelectedOutline(props) {
  //let box = document.createElement('div');
  const [boxColour, setBoxColour] = useState(props.status);

  const onClickEvent = () => {
    //setBoxColour("selectedBox");
    props.changeSelectionState(props.index);
  };

  return (
    <div className={"selectedBoxOutline"}>
      <div>{props.val}</div>
    </div>
  );
}

export default BoxSelectedOutline;
