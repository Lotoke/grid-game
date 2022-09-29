import * as math from "mathjs";
import RowCountBox from "./RowCountBox";
function RowCount(props) {
  var rowCountGrid = [];

  for (let row = 0; row < 10; row++) {
    rowCountGrid.push(
      <RowCountBox val={props.inputRowSum[row]} key={`${row}`}></RowCountBox>
    );
  }

  return <div className="rowCountGridBoard">{rowCountGrid}</div>;
}
export default RowCount;
