import React, {Fragment} from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";
import {ReactSVGPanZoom} from 'react-svg-pan-zoom'
// import Links from './Links';
import Links from "./LinksMove";

// import Nodes from './Nodes';
import Nodes from "./NodesMove";
//style

import './treeStyle.css';

import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';

export default class  extends React.Component {

  state = {
    layout: "cartesian",
    orientation: "horizontal",
    linkType: "step",
    stepPercent: 0.5,
    
  };

  Viewer = null

  componentDidMount() {
    this.Viewer.fitToViewer();
  }



  render() {
    const {
      data,
      width,
      height,
      events = false,
      margin = {
        top: 0,
        left: 200,
        right: 0,
        bottom: 200
      }
    } = this.props;
    const { layout, orientation, stepPercent } = this.state;

    // if (width < 10) return null;

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
      origin = { x: 0, y: 400 };
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
        {/* <div>
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
      
       */}
        <button className="tree-btn" onClick={() => this.Viewer.zoomOnViewerCenter(1.1)}>Zoom in</button>
        <button className="tree-btn" onClick={() => this.Viewer.fitSelection(0, 0, 2000, 2000)}>Zoom area</button>
        <button className="tree-btn" onClick={() => this.Viewer.fitToViewer()}>Fit</button>

        <hr/>
        <Fragment className='tree-container'>
        <UncontrolledReactSVGPanZoom
          width={2000} height={2000}
          ref={Viewer => this.Viewer = Viewer}

          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
        >
       
        <svg viewBox={'0 0 900 900'}>
            <g>
        <rect width="2000" height="2000" fill="#616264" />
        
      <Tree
            top={margin.top}
            left={margin.left}
            bottom={margin.bottom}
            right={margin.right}
            root={root}
            nodeSize={[200,400]}
          
          >

            {({ data }) => (
              <Group top={origin.y} left={origin.x}>
                <Links
                  links={data.links()}
                  linkType={'step'}
                  layout={'cartesian'}
                  orientation={'horizontal'}
                  stepPercent={stepPercent}
                />

                <Nodes
                  nodes={data.descendants()}
                  layout={'cartesian'}
                  orientation={'horizontal'}
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
       
       
          </g>
          
        </svg>
       
        </UncontrolledReactSVGPanZoom>
        </Fragment>
      </div>
    );
  }
}
