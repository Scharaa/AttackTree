import React from "react";
import { render } from "react-dom";
import Tree from "./Tree";
import data from "./data";

import './treeStyle.css'

const App = () => 
<div>
    The Attack Tree
    <button cursor="pointer" background-color='black'>test</button>
<Tree data={data} width={1000} height={1000} />
</div>
;

render(<App />, document.getElementById("root"));
