import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from 'reactflow';
import {
  adjustSwitchHandle,
  deleteStage,
  deleteSwitch,
  findEdgeIfNodeConnectedToSwitch,
} from './StageUtils';

import './workflow.css';
//const handleStyle = { opacity: 100 };

type UseShapeOptions = {
  type: string;
  width: number;
  height: number;
  color: string;
  selected: boolean;
  boxShadowColor: string;
};

let id = 0;

const getId = (nodeName) => {
  return nodeName + ' _' + id++;
};

const SWITCH = 'Switch';

function useShape({
  type,
  width,
  height,
  color = '#9ca8b3',
  selected,
  boxShadowColor,
}: UseShapeOptions) {
  const styles = { fill: color, filter: boxShadowColor };
  const radius = 2;
  switch (type) {
    case 'circle':
      return (
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={width / 2}
          ry={height / 2}
          {...styles}
        />
      );
    case 'round-rect':
      return (
        <rect
          x={0}
          y={0}
          rx={height / 2}
          width={width}
          height={height}
          {...styles}
        />
      );
    case 'round-rect-switch-end':
      return (
        <rect
          x={0}
          y={0}
          rx={height / 2}
          width={width}
          height={height}
          {...styles}
        />
      );
    case 'rectangle':
      return (
        <rect x={0} y={0} rx={5} width={width} height={height} {...styles} />
      );
    case 'square':
      return (
        <rect x={0} y={0} rx={2} width={width} height={height} {...styles} />
      );
    case 'hexagon':
      return (
        <path
          d={`M10,0 L${width - 10},0  L${width},${height / 2} L${
            width - 10
          },${height} L10,${height} L0,${height / 2} z`}
          {...styles}
        />
      );
    case 'diamond':
      const points = {
        top: { x: width / 2, y: radius },
        right: { x: width - radius, y: height / 2 },
        bottom: { x: width / 2, y: height - radius },
        left: { x: radius, y: height / 2 },
      };

      // Path data using line to (L) and quadratic curve (Q) commands
      const pathDiamomdData = [
        `M${points.top.x},${points.top.y}`,
        `L${points.right.x},${points.right.y - radius}`,
        `Q${points.right.x},${points.right.y} ${points.right.x},${
          points.right.y + radius
        }`,
        `L${points.bottom.x},${points.bottom.y}`,
        `Q${points.bottom.x},${points.bottom.y + radius} ${points.left.x},${
          points.left.y + radius
        }`,
        `L${points.left.x},${points.left.y - radius}`,
        `Q${points.left.x},${points.left.y} ${points.left.x},${
          points.left.y - radius
        }`,
        `L${points.top.x},${points.top.y}`,
        'Z',
      ].join(' ');

      return <path d={pathDiamomdData} {...styles} />;

    case 'arrow-rect':
      return (
        <path
          d={`M0,0 L${width - 10},0  L${width},${height / 2} L${
            width - 10
          },${height} L0,${height} z`}
          {...styles}
        />
      );
    case 'database':
      return (
        <path
          d={`M0,${height * 0.125}  L 0,${height - height * 0.125} A ${
            width / 2
          } ${height * 0.125} 0 1 0 ${width} ${
            height - height * 0.125
          } L ${width},${height * 0.125} A ${width / 2} ${
            height * 0.125
          } 0 1 1 0 ${height * 0.125} A ${width / 2} ${
            height * 0.125
          } 0 1 1 ${width} ${height * 0.125} A ${width / 2} ${
            height * 0.125
          } 0 1 1 0 ${height * 0.125} z`}
          {...styles}
          strokeWidth={selected ? styles.filter : 0}
        />
      );
    case 'parallelogram':
      // Points of the parallelogram
      const point1 = { x: width * 0.05, y: 0 };
      const point2 = { x: width, y: 0 };
      const point3 = { x: width - width * 0.05, y: height };
      const point4 = { x: 0, y: height };

      const pathData = `
         M${point1.x},${point1.y}
         L${point2.x - radius},${point2.y}
         A${radius},${radius} 0 0,1 ${point2.x},${point2.y + radius}
         L${point3.x},${point3.y - radius}
         A${radius},${radius} 0 0,1 ${point3.x - radius},${point3.y}
         L${point4.x + radius},${point4.y}
         A${radius},${radius} 0 0,1 ${point4.x},${point4.y - radius}
         L${point1.x},${point1.y + radius}
         A${radius},${radius} 0 0,1 ${point1.x + radius},${point1.y}
     `;

      return (
        <svg width={width} height={height}>
          <path d={pathData} {...styles} />
        </svg>
      );

    case 'chevron':
      // Points of the parallelogram
      const point11 = { x: width * 0.25, y: 0 };
      const point12 = { x: width, y: 0 };
      const point13 = { x: width * 0.75, y: height };
      const point14 = { x: 0, y: height };
      const point15 = { x: width * 0.25, y: height / 2 };

      const pathData1 = `
          M${point11.x},${point11.y}
          L${point12.x - radius},${point12.y}
          A${radius},${radius} 0 0,1 ${point12.x},${point12.y + radius}
          L${point13.x},${point13.y - radius}
          A${radius},${radius} 0 0,1 ${point13.x - radius},${point13.y}
          L${point14.x + radius},${point14.y}
          A${radius},${radius} 0 0,1 ${point14.x},${point14.y - radius}
          L${point15.x - radius},${point15.y}
          A${radius},${radius} 0 0,0 ${point15.x},${point15.y - radius}
          L${point11.x},${point11.y + radius}
          A${radius},${radius} 0 0,1 ${point11.x + radius},${point11.y}
        `;

      return (
        <svg width={width} height={height}>
          <path d={pathData1} fill={color} stroke={color} />
          <text
            x={width / 2}
            y={height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="14"
          >
            Chevron
          </text>
        </svg>
      );

    case 'sub-workflow':
      return (
        <rect x={0} y={0} rx={10} width={width} height={height} {...styles} />
      );

    default:
      return null;
  }
}

function ShapeNode({ id, data, selected = true }: NodeProps) {
  const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow();
  // dragEnterOnElement - is used to let user know that dragged item is entered on respective node. This helps in adding box-shadow and color when it is being dragged on node.
  const [dragEnterOnElement, setDragEnterOnElement] = useState<boolean>(false);

  const width = data?.width || 100;
  const height = data?.height || 100;
  const shape = useShape({
    type: data?.activityConfig?.activityTemplate?.activityNode?.shape,
    width,
    height,
    color: dragEnterOnElement ? '#394563' : data?.color,
    selected,
    boxShadowColor: data?.boxShadowColor,
  });

  /**
   * This function is to add drag enter functionality to the specific node. we are changing color and adding box shadow to the node on dragenter
   */
  const onDragEnter = () => {
    if (!dragEnterOnElement) setDragEnterOnElement(true);
  };

  /**
   * This is to let user know that dragged element has lost focus on current node. we are removing box shadow and reverting to default color.
   */
  const onDragLeave = () => {
    setDragEnterOnElement(false);
  };

  /**
   * This is to remove the box shadow and color when the element is dropped on respective node
   */
  const onDrop = () => {
    setDragEnterOnElement(false);
  };

  const custom =
    data?.activityConfig?.activityTemplate?.activityNode?.custom || false;
  const hideTop =
    data?.activityConfig?.dxpActivityLabel === 'Start' ? true : false;
  const hideBottom =
    data?.activityConfig?.activityTemplate?.activityNode?.shape === 'diamond' ||
    data?.activityConfig?.dxpActivityLabel === 'Stop' ||
    data?.activityConfig?.dxpActivityLabel?.toLowerCase() === 'end'
      ? true
      : false;
  const hideLeft = ['Stage'].includes(data?.activityConfig?.dxpTypeLabel)
    ? false
    : true;
  const hideRight = ['Stage'].includes(data?.activityConfig?.dxpTypeLabel)
    ? false
    : true;
  const { deleteElements } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const [items, setItems] = useState<Array<{ message: string; id: string }>>(
    data.items ?? []
  );

  const addNewhHandle = (event) => {
    event.stopPropagation();
    data.handleCount += 1;
  };

  useEffect(() => {
    data.items = items;
    updateNodeInternals(id);
  }, [items, data, id, updateNodeInternals, getEdges]);

  const deleteSelectedElements = useCallback(
    (event) => {
      event.stopPropagation();
      const nodes = getNodes();
      const edges = getEdges();
      //if node to be deleted is a switch node, we will need to remove all the nodes associated with the switch including SwitchEnd Node.
      //Find the ancestor nodes for Switch and the Successor nodes for SwitchEnd. Other than those nodes, rest all must be removed as they are a part of the Switch Case.
      //Find edge which has switch as target and the switchend as soruce. -- from these 2 edges, we can find out the source and target nodes for which new edge has to be created when the middle edges are removed.
      //Find the edges which either has a source or target from the nodes to be deleted. These edges has to be removed and replaced with the edge we created.
      if (id.includes('Stage')) {
        deleteStage(id, nodes, edges, setNodes, setEdges, deleteElements);
      } else if (id.includes(SWITCH)) {
        deleteSwitch(id, nodes, edges, setNodes, setEdges, deleteElements);
      } else {
        const edge = findEdgeIfNodeConnectedToSwitch(edges, id);
        if (edge.length > 0) {
          adjustSwitchHandle(edge, setNodes);
        }
        deleteElements({ nodes: [{ id }] });
      }
    },
    [id, deleteElements]
  );

  function SvgElement() {
    return (
      <svg
        style={{
          display: 'flex',
          overflow: 'visible',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: dragEnterOnElement ? '5px' : 0,
          boxShadow: dragEnterOnElement ? '0 0 9px 0 #394563' : 'none',
        }}
        width={width}
        height={height}
      >
        {shape}
      </svg>
    );
  }

  const sourceHandles = () => {
    return (
      <div>
        {[...Array(data.handleCount)].map((_, index) => (
          <Handle
            key={`bottom_${index}`}
            position={Position.Bottom}
            type={'source'}
            id={`bottom_${index}`}
          />
        ))}
      </div>
    );
  };

  const typeToDisplay =
    data?.activityConfig?.dxpTypeLabel === 'Task' ? 'Stage' : 'Context State';

  return (
    <div>
      {!hideTop ? (
        <Handle
          id="top"
          position={Position.Top}
          type={'target'}
          isConnectableStart={true}
        />
      ) : null}
      {!hideLeft ? (
        <Handle
          id="left"
          position={Position.Left}
          type="target"
          isConnectableEnd={true}
        />
      ) : null}
      {!hideRight ? (
        <Handle
          id="right"
          position={Position.Right}
          type="source"
          isConnectableEnd={true}
        />
      ) : null}
      {!hideBottom ? (
        <Handle
          id="bottom"
          position={Position.Bottom}
          type="source"
          isConnectableEnd={true}
        />
      ) : null}
      {data.handleType === 'custom' ? sourceHandles() : null}

      {data?.activityConfig?.activityTemplate?.activityNode?.shape ===
      'diamond' ? (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
          }}
        >
          <SvgElement />
        </div>
      ) : (
        <SvgElement />
      )}

      {custom ? (
        <HighlightOffOutlinedIcon
          onClick={deleteSelectedElements}
          style={{
            top: -5,
            cursor: 'pointer',
            right: -5,
            width: '10px',
            height: '10px',
            color: 'grey',
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '50%',
          }}
        />
      ) : null}
      {/* 
      {data?.activityConfig?.activityTemplate?.activityNode?.shape ===
        "diamond" ? (
        <AddCircleOutlineIcon
          onClick={addNewhHandle}
          style={{
            bottom: -5,
            cursor: "pointer",
            right: -5,
            width: "10px",
            height: "10px",
            position: "absolute",
            backgroundColor: "#FD0",
            borderRadius: "50%",
          }}
        />
      ) : null} */}
      <Tooltip
        title={data?.activityConfig?.dxpActivityToolTip}
        arrow
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -10],
                },
              },
            ],
          },
        }}
        style={{ flex: 1 }}
      >
        <Box
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontWeight: '500',
              color: '#000000',
              fontSize: '7px',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <Typography fontSize={'8px'} style={{ wordBreak: 'break-all' }}>
              {data?.activityConfig.dxpActivityLabel}
            </Typography>

            {data?.activityConfig?.activityTemplate?.activityNode?.custom && (
              <Typography fontSize={'6px'} style={{ wordBreak: 'break-all' }}>
                {typeToDisplay}
              </Typography>
            )}
          </div>
        </Box>
      </Tooltip>
    </div>
  );
}

export default React.memo(ShapeNode);
