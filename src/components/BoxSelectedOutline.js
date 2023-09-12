import * as math from "mathjs";
import { useEffect, useState } from "react";
import "../App";
import Grid from "./Grid";
import GridUpdater from "./GridUpdater";

function BoxSelectedOutline(props) {
  //let box = document.createElement('div');
  const [boxColour, setBoxColour] = useState(props.status);

  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    //setBoxColour("selectedBox");
    //props.changeSelectionState(props.index);
    setIsExpanding(true);

    // Remove the expand-retract class after the animation is complete
    setTimeout(() => {
      setIsExpanding(false);
    }, 300); // 0.3 seconds, which matches the animation duration
  }, []);

  return (
    <div
      className={`${"selectedBoxOutline"} ${
        isExpanding ? "expand-retract" : ""
      }`}
    >
      <div>{props.val}</div>
    </div>
  );
}

export default BoxSelectedOutline;
