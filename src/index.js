import React from "react";
import { render } from "react-dom";
import Tree from "./Tree";
import data from "./data";

import './treeStyle.css'

const AttackTree = () => 

<Tree data={data} />

;

render(<AttackTree />, document.getElementById("root"));


export default AttackTree

