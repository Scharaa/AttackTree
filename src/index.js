import React from "react";
import { render } from "react-dom";
import Tree from "./Tree";
import data from "./data";

const App = () => <Tree data={data} width={1000} height={1000} />;

render(<App />, document.getElementById("root"));
