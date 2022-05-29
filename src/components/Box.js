import * as math from "mathjs";
import { useState } from "react";
import "../App";
import Grid from "./Grid";
function Box(props) {
  //let box = document.createElement('div');
  const [boxColour, setBoxColour] = useState(props.selectionStatus);

  const boxSelect = () => {
    setBoxColour("selectedBox");
    console.log(props.index);
  };
  return (
    <div onClick={boxSelect} className={boxColour}>
      <div>{props.val}</div>
    </div>
  );
}

export default Box;
