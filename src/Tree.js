import React from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";


// import Links from './Links';
import Links from "./LinksMove";

// import Nodes from './Nodes';
import Nodes from "./NodesMove";

//Zoom 

import {ReactSVGPanZoom} from 'react-svg-pan-zoom'


const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: -211.62,
  translateY: 162.59,
  skewX: 0,
  skewY: 0
};

export default class extends React.Component {

  state = {
    layout: "cartesian",
    orientation: "horizontal",
    linkType: "diagonal",
    stepPercent: 0.5
  };

  render() {
    const {
      data,
      width,
      height,
      events = false,
      margin = {
        top: 400,
        left: 200,
        right: 30,
        bottom: 300
      }
    } = this.props;
    const { layout, orientation, linkType, stepPercent, showMiniMap } = this.state;

    if (width < 10) return null;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === "polar") {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
      }
    }

    const root = hierarchy(data, d => (d.isExpanded ? d.children : null));
    // root.each((node, i) => node.onClick = () => {
    //   console.log('clicked');
    // });

    return (
      <div>
        <div>
          <label>layout:</label>
          <select
            onChange={e => this.setState({ layout: e.target.value })}
            value={layout}
          >
            <option value="cartesian">cartesian</option>
            <option value="polar">polar</option>
          </select>

          <label>orientation:</label>
          <select
            onChange={e => this.setState({ orientation: e.target.value })}
            value={orientation}
            disabled={layout === "polar"}
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>

          <label>link:</label>
          <select
            onChange={e => this.setState({ linkType: e.target.value })}
            value={linkType}
          >
            <option value="diagonal">diagonal</option>
            <option value="step">step</option>
            <option value="curve">curve</option>
            <option value="line">line</option>
            <option value="elbow">elbow</option>
          </select>

          <label>step:</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={e => this.setState({ stepPercent: e.target.value })}
            value={stepPercent}
            disabled={linkType !== "step" || layout === "polar"}
          />
        </div>

        <svg width={10000} height={20000} >
          <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
          <rect width={10000} height={20000} rx={1} fill="azure" />
          
          <Tree
            top={margin.top}
            left={margin.left}
            bottom={margin.bottom}
            root={root}
            nodeSize={[500,500]}
          >

            {({ data }) => (
              <Group top={origin.y} left={origin.x}>
                <Links
                  links={data.links()}
                  linkType={linkType}
                  layout={layout}
                  orientation={orientation}
                  stepPercent={stepPercent}
                />

                <Nodes
                  nodes={data.descendants()}
                  layout={layout}
                  orientation={orientation}
                  onNodeClick={node => {
                    if (!node.data.isExpanded) {
                      node.data.x0 = node.x;
                      node.data.y0 = node.y;
                    }
                    node.data.isExpanded = !node.data.isExpanded;
                    this.forceUpdate();
                  }}
                />
              </Group>
            )}
          </Tree>
        </svg>
      </div>
    );
  }
}
