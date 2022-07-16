import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import * as math from "mathjs";
import { speedOfLightDependencies } from "mathjs";
import '../App.css';
function Box() {
  //let box = document.createElement('div');
  
  return(
<div style ={styles.box} onClick={()=>alert("test")}></div>
  );
}

const styles = {
box:{
  backgroundColor: '#fefbf0',
  borderColor: '#d4d3d0',
  height:40,
  width:40,
  borderStyle: 'solid',
  
  borderWidth:'2px',

}
}

export default Box;
