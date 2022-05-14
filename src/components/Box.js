import * as math from "mathjs";
import "../App";
function Box(props) {
  //let box = document.createElement('div');

  return (
    <div className="box">
      <div>{props.val}</div>
    </div>
  );
}

export default Box;
