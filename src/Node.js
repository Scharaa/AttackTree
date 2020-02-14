import React, { Fragment } from 'react';


function Node({ node, onClick }) {
	const width = 300;
	const height = 100;
	const innerY = -height / 2;
	const innerX = -width / 2;

	return (
		<Fragment className="attack_tree">
			{node.depth === 0 && (
				<Fragment className="project-class">
					<rect
						className="project-class"
						height={height}
						width={width}
						y={innerY}
						x={innerX}
						fill={'white'}
						stroke={node.data.children ? '#03c0dc' : '#26deb0'}
						strokeWidth={1}
						strokeDasharray={ '0'}
						strokeOpacity={ 1}
						rx={ 0}
						onClick={onClick}
					/>
					<text
						className="projectclass"
						x={innerX + 80}
						y={innerY + 45}
						fontSize={15}
						fontFamily="Arial"
						textAnchor={'middle'}
						style={{ pointerEvents: 'none' }}
						fill={'black'}
					>
						Project: {node.data.name}
						<tspan x={innerX + 30} y={innerY + 70} fontSize={15}>
							{node.data.description}
						</tspan>
					</text>
					{/* <foreignObject width="100" height="100" x={innerX + 20} y={innerY + 140}>
						<button fontSize={20}>New Asset</button>
					</foreignObject>
          <text  x={innerX+220} y={innerY + 154}	style={{ pointerEvents: 'none' }}
						fill={'black'}  	fontFamily="Arial"> Reviewed

</text>
          <foreignObject width="100" height="100" x={innerX+190} y={innerY + 140}>

<input type="checkbox" checked="checked" cursor='pointer'></input>
  <span class="checkmark"></span>
					</foreignObject> */}
				</Fragment>
			)}
			{node.depth !== 0 && (
				<Fragment>
						<rect
					height={height}
					width={width}
					y={-height / 2}
					x={-width / 2}
					fill={'white'}
					stroke={'#26deb0'}
					strokeWidth={1}
					strokeDasharray={'0'}
					strokeOpacity={1}
					rx={0}
					onClick={onClick}
				/>
					<text
						className="projectclass"
						x={innerX + 80}
						y={innerY + 45}
						fontSize={15}
						fontFamily="Arial"
						textAnchor={'middle'}
						style={{ pointerEvents: 'none' }}
						fill={'black'}
					>
						Entity: {node.data.name}
						<tspan x={innerX + 30} y={innerY + 70} fontSize={15}>
							{node.data.description}
						</tspan>
					</text>
				</Fragment>
			
			)}

{node.entity_type === 'asset' && (
				<Fragment>
						<rect
					height={height}
					width={width}
					y={-height / 2}
					x={-width / 2}
					fill={'white'}
					stroke={'#26deb0'}
					strokeWidth={1}
					strokeDasharray={'0'}
					strokeOpacity={1}
					rx={0}
					onClick={onClick}
				/>
					<text
						className="projectclass"
						x={innerX + 80}
						y={innerY + 45}
						fontSize={15}
						fontFamily="Arial"
						textAnchor={'middle'}
						style={{ pointerEvents: 'none' }}
						fill={'black'}
					>
						Entity: {node.data.name}
						<tspan x={innerX + 30} y={innerY + 70} fontSize={15}>
							{node.data.description}
						</tspan>
					</text>
				</Fragment>
			
			)}
		</Fragment>
	);
}

export default Node;
