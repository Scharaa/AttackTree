import React from "react";
import { render } from "react-dom";
import Tree from "./Tree";
import data from "./data";


const App = () => 
<div>
    The Attack Tree
<Tree data={data} width={1000} height={1000} />
</div>
;

render(<App />, document.getElementById("root"));
