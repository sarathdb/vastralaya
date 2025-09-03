// import taxonomyStore from "../store";

export const STAGE = "Stage";
export const TASK = "Task";
export const STATUS = "Status";
export const REACTFLOW_NODE = ".react-flow__node";
export const REACTFLOW_EDGE = ".react-flow__edge";
export const END = "End";
export const SWITCH = "Switch";
export const SWITCH_END = "Switch End";

export const REACTFLOW_NODE_ATTRIBUTE = "data-id";
export const REACTFLOW_EDGE_ATTRIBUTE = "data-testid";

const conductorType = {
  HTTP: "HTTP",
  HUMAN: "HUMAN",
  INLINE: "INLINE",
  SWITCH: "SWITCH",
  WAIT: "WAIT",
  BUSINESS_RULE: "SIMPLE_RULE",
  SIMPLE_EXCEPTION: "SIMPLE_EXCEPTION",
  HTTP_IDP: "HTTP_IDP",
  HTTP_LLM: "HTTP_LLM",
  HTTP_STATUS: "HTTP_STATUS",
  START: "Start",
  SUB_WORKFLOW: "SUB_WORKFLOW",
  SIMPLE: "SIMPLE",
  SET_VARIABLE: "SET_VARIABLE",
  FORK_JOIN: "FORK_JOIN",
  SIMPLE_WORKER: "SIMPLE_WORKER",
};

export function createStartAndEndNodes(index = 1) {
  let startNode, endNode;
  let position = {
    x: index * 100,
    y: 150,
  };

  const stage = {
    solutionKey: null,
    catalogKey: null,
    _id: "65c432afae2f56f10cb97faa",
    applicationKey: "dxpplatform_irm-1707228132071",
    activityKey: "start-1",
    activityName: "Start",
    activityCategoryId: 0,
    activityConfig: {
      activityOwner: "Platform",
      activityTemplate: {
        activityConfigurationProperties: {
          taskReferenceName: "ref-start",
          conductorType: "Start",
        },
        activityNode: {
          shape: "round-rect",
          custom: false,
        },
      },
      activityType: "Task",
      dxpActivityLabel: "Start",
      dxpTypeLabel: "Start",
      dxpActivityToolTip: "",
    },
    version: "1",
    createdBy: "SYSTEM",
    modifiedBy: "",
    createdDttm: "2024-02-08T01:47:27.982Z",
    modifiedDttm: "2024-02-08T01:47:27.982Z",
    isDeleted: false,
  };

  const { activityConfig } = stage;
  const { activityTemplate } = activityConfig;
  const { activityNode } = activityTemplate;

  if (activityNode != null) {
    startNode = {
      id: "Stage _999",
      type: "shape",
      position,
      draggable: true,
      dragging: true,
      deletable: false,
      data: {
        width: getShapeDetails(activityNode.shape).width,
        height: getShapeDetails(activityNode.shape).height,
        color: getShapeDetails(activityNode.shape).color,
        activityConfig: activityConfig,
      },
    };
  }

  const task = {
    solutionKey: null,
    catalogKey: null,
    _id: "65ca3d52910b0a39e7a3862c",
    applicationKey: "dxpplatform_irm-1707228132071",
    activityKey: "task-1",
    activityName: "Tash",
    activityCategoryId: 3,
    activityConfig: {
      activityOwner: "Platform",
      activityTemplate: {
        activityNode: {
          shape: "rectangle",
          custom: true,
        },
        activityConfigurationProperties: {
          conductorType: "HTTP_LLM",
        },
      },
      activityType: "Task",
      dxpActivityLabel: `Task`,
      dxpTypeLabel: "Task",
      dxpActivityToolTip: "Defines a task within a stage",
    },
    version: "1",
    createdBy: "SYSTEM",
    modifiedBy: "",
    createdDttm: "2024-02-08T01:47:27.963Z",
    modifiedDttm: "2024-02-08T01:47:27.963Z",
    isDeleted: false,
  };

  const { activityConfig: endTaskConfig } = task;
  const { activityTemplate: endTaskTemplate } = endTaskConfig;
  const { activityNode: endTaskNode } = endTaskTemplate;

  position = {
    x: index * 100,
    y: 300,
  };
  endNode = {
    id: "Task _999",
    type: "shape",
    position,
    draggable: true,
    dragging: true,
    deletable: false,
    data: {
      width: getShapeDetails(endTaskNode.shape).width,
      height: getShapeDetails(endTaskNode.shape).height,
      color: getShapeDetails(endTaskNode.shape).color,
      activityConfig: endTaskConfig,
    },
  };

  return { startNode, endNode };
}

let id = 0;

export const getId = (nodeName) => {
  return nodeName + " _" + id++;
};

export const shapes = [
  {
    id: "2",
    name: "Circle",
    value: "circle",
  },
  {
    id: "3",
    name: "Rounded Rectangle",
    value: "round-rect",
    color2: "#EF5350",
    color: "#FD0",
    width: 40,
    height: 30,
  },
  {
    id: "4",
    name: "Rectangle",
    value: "rectangle",
    width: 120,
    height: 40,
    color: "#C7EAFB",
  },
  {
    id: "5",
    name: "Square",
    value: "square",
  },
  {
    id: "6",
    name: "Hexagon",
    value: "hexagon",
  },
  {
    id: "7",
    name: "Diamond",
    value: "diamond",
    width: 100,
    height: 60,
    color: "#D1C4E9",
  },
  {
    id: "8",
    name: "Arrow Rectangle",
    value: "arrow-rect",
    width: 120,
    height: 40,
    color: "#e98d8d",
  },
  {
    id: "9",
    name: "Database",
    value: "database",
  },
  {
    id: "10",
    name: "Parallelogram",
    value: "parallelogram",
  },
  {
    id: "11",
    name: "Sub-Workflow",
    value: "sub-workflow",
  },

  {
    id: "12",
    name: "Rounded Rectangle Switch End",
    value: "round-rect-switch-end",
    width: 90,
    height: 25,
    color: "#efefef",
  },
  {
    id: "13",
    name: "Rectangle",
    value: "rectangle",
    width: 120,
    height: 40,
    color: "#C7EAFB",
  },
];

export const getShapeDetails = (shape: string) => {
  const object = shapes.filter((item) => item.value === shape);

  return object[0];
};

//Use this to create a standard node
export function createNewNode(nodeTemplateActivity, nodeTypeData, position) {
  //if new node is a switch node, it requires handles to added dynamically. Hence, we will need to add handleType as custom and handleCount.
  const data = {
    width: getShapeDetails(nodeTemplateActivity.shape).width,
    height: getShapeDetails(nodeTemplateActivity.shape).height,
    color:
      nodeTypeData.color || getShapeDetails(nodeTemplateActivity.shape).color,
    activityConfig: nodeTypeData.activityConfig,
  };
  const labelForNode = nodeTypeData.activityConfig.dxpTypeLabel;
  const newNode = {
    id: getId(labelForNode),
    type: "shape",
    position,
    draggable: false,
    dragging: false,
    deletable: true,
    data: data,
  };

  return { data, newNode };
}

//use this to create a standard edge
export function createEdgeBetweenSourceAndTarget(
  source,
  newNode,
  nodes,
  edges,
  options = {}
) {
  // const sourceNode = nodes.filter((nd)=>nd.id.includes(sourceId))[0];
  let newEdge = {
    id: getId(source.id + "-" + newNode.id),
    source: source.id,
    target: newNode.id,
    animated: false,
    isUpdatable: true,
    sourceHandle: null,
    type: "custom",
    //type: isNodeDiamond(source) ? "custom" : connectionLineType,
    data: isNodeDiamond(source)
      ? {
          label: getEdgeLabelForSwitch(source, edges),
        }
      : null,
    markerEnd: {
      type: "arrow",
    },
    ...options,
  };

  newEdge = getNewEdgeDetailsForSwitchCase(nodes, edges, newEdge);
  return newEdge;
}

//check if the shape of the node is a diamond
export function isNodeDiamond(node) {
  return (
    node?.data?.activityConfig?.activityTemplate?.activityNode?.shape ===
    "diamond"
  );
}

//get the edge case label for switch case
export function getEdgeLabelForSwitch(sourceNode, edges) {
  return isNodeDiamond(sourceNode) ? getCaseId(sourceNode.id, edges) : null;
}

//Use this to populate the ActivityType, ActivityCase, ActivitySwitchReference fields for the edge which a part of the SwitchCase
export function getNewEdgeDetailsForSwitchCase(edges, newEdge, targetId) {
  if (edges.filter((e) => e.target === targetId).length > 0) {
    let ancestorEdge = edges.filter((e) => e.target === targetId)[0];
    //if the ancestor edge has a switch as source & the targetId as target, add activity related fields
    if (isEdgeSourceSwitch(newEdge)) {
      newEdge = {
        ...newEdge,
        data: {
          ...newEdge.data,
          activitySwitchID: newEdge.source,
        },
      };
    } else if (ancestorEdge.data?.activitySwitchID) {
      newEdge = {
        ...newEdge,
        data: {
          activityType: conductorType.SWITCH,
          activityCase:
            ancestorEdge?.data?.activityCase || ancestorEdge?.data?.label,
          activitySwitchID: ancestorEdge.data?.activitySwitchID,
        },
      };
    }
  }
  return newEdge;
}

//This is for populating the case-labels properly. When a case is removed, the counter should get populated properly.
export function getCaseId(sourceNodeId: string, edges) {
  let caseEdges = edges.filter((e) => e.source === sourceNodeId);
  if (caseEdges.length > 0) {
    return "Case" + "_" + (caseEdges.length + 1);
  } else {
    return "default";
  }
}

//check if source of a given edge is switch
export function isEdgeSourceSwitch(edge) {
  return edge?.source.includes(SWITCH) && !edge?.source.includes(SWITCH_END);
}

export function removeDuplicateEdges(
  remaningEdges: any[],
  createdEdges: any[]
) {
  let newSet = new Set<any>();
  createdEdges.forEach((e2) => {
    remaningEdges.forEach((e1) => {
      if (e1.source.includes(e2.source) && e1.target.includes(e2.target)) {
        newSet.add(e2);
      }
    });
  });
  return createdEdges.filter((e) => !Array.from(newSet).includes(e));
}

// this function adds a new node and connects it to the source node
export function createConnection(
  newNode: any,
  newEdge: any,
  nodes,
  edges,
  setNodes,
  setEdges,
  sourceNode = undefined,
  jump = undefined,
  edgeT = undefined
) {
  if (!nodes.includes(newNode))
    setNodes((nodes) => {
      if (nodes.length === 1) nodes[0]["hidden"] = true;
      if (sourceNode) {
        const nodePosition =
          nodes.map((n) => n.id).lastIndexOf(sourceNode.id) + 1;
        const finalNodes = [
          ...nodes.slice(0, nodePosition),
          newNode,
          ...nodes.slice(nodePosition),
        ];
        return finalNodes;
      } else {
        return nodes.concat([newNode]);
      }
    });

  if (!edges.includes(newEdge))
    setEdges((edges) => {
      let finalEdges;
      if (sourceNode) {
        let insertPos = edges.map((e) => e.target).lastIndexOf(sourceNode.id);
        insertPos = (insertPos === -1 ? 0 : insertPos) + jump;
        const edgePostion = insertPos;
        finalEdges = [
          ...edges.slice(0, edgePostion),
          newEdge,
          ...edges.slice(edgePostion),
        ];

        if (edgeT) {
          finalEdges = finalEdges.filter(
            (e) => !(e.source === edgeT.source && e.target === edgeT.target)
          );
          finalEdges = [
            ...finalEdges.slice(0, edgePostion + 1),
            edgeT,
            ...finalEdges.slice(edgePostion + 1),
          ];
        }
      } else {
        finalEdges = edges.concat([newEdge]);
      }
      const finalEdgesForStages = finalEdges.filter(
        (e) => e.source.includes("Stage") && e.target.includes("Stage")
      );
      const finalEdgesForTasks = finalEdges.filter(
        (e) => e.source.includes("Task") || e.target.includes("Task")
      );

      return [...finalEdgesForStages, ...finalEdgesForTasks];
    });

  /*
  if (!edges.includes(newEdge)) setEdges((edges) => {
    let finalEdges = edges.concat([newEdge]);
    let finalEdgesForStages = finalEdges.filter(e => e.source.includes('Stage') && e.target.includes('Stage'));
    let finalEdgesForTasks = finalEdges.filter(e => e.source.includes('Task') || e.target.includes('Task'));

    if (getNodes !== undefined) {
      let nodes = getNodes().map(n => n.id);

      finalEdgesForStages = finalEdgesForStages.sort((e1, e2) =>
        nodes.indexOf(e1.target) < nodes.indexOf(e2.target) ? 1 :
          (nodes.indexOf(e1.target) > nodes.indexOf(e2.target) ? -1 :
            (nodes.indexOf(e1.source) < nodes.indexOf(e2.source) ? 1 : -1)
          )
      )

      return [...finalEdgesForStages, ...finalEdgesForTasks];
    } else {
      return [...finalEdgesForStages, ...finalEdgesForTasks];
    }

  });
  */
}

export function adjustSourceHandleForSwitch(
  remainingEdges,
  connectedNode,
  positionRightEdges
) {
  const finalRemaining = remainingEdges.map((e) => {
    if (
      e.source.includes(connectedNode) &&
      positionRightEdges.indexOf(e) !== -1
    ) {
      let sourceHandleId = Number(e?.sourceHandle?.split("_", 2)[1]);
      const sourceHandle =
        sourceHandleId !== 0 && !Number.isNaN(sourceHandleId)
          ? "bottom_" + (sourceHandleId - 1)
          : "bottom_" + 0;
      e = {
        ...e,
        sourceHandle: sourceHandle,
      };
      return e;
    } else {
      return e;
    }
  });
  return finalRemaining;
}

export function finalEdges(incomers, outgoers) {
  const finalEdges = incomers.flatMap(({ id: source }) =>
    outgoers.map(({ id: target }) => ({
      id: `${source}->${target}`,
      source,
      target,
      animated: false,
      isUpdatable: true,
      type: "custom",
      markerEnd: {
        type: "arrow",
      },
    }))
  );

  // if source & target are 'Context State' apply source & target handles
  // if source is root apply hidden
  finalEdges.map((e) => {
    if (e.source.includes("Stage") && e.target.includes("Stage")) {
      e.sourceHandle = "right";
      e.targetHandle = "left";
    }
    if (e.source.includes("_999")) {
      e.hidden = "true";
    }
  });

  return finalEdges;
}

export function getSwitchIdByEnd(endId) {
  return SWITCH + " _" + (Number(endId.split("_", 2)[1]) - 1);
}

//check if edge is a switch
export function isEdgeSwitch(edge) {
  return edge.includes(SWITCH) && !edge.includes(SWITCH_END);
}

//use this to get the closest node from event when dropping
export function getClosestNodeFromEvent(event) {
  return event.target
    .closest(REACTFLOW_NODE)
    ?.getAttribute(REACTFLOW_NODE_ATTRIBUTE);
}
//use this to get the closest edge from event when dropping
export function getClosestEdgeFromEvent(event) {
  return event.target
    .closest(REACTFLOW_EDGE)
    ?.getAttribute(REACTFLOW_EDGE_ATTRIBUTE);
}

//User cannot drop on End Node
export function isDropDisabled(targetId: string) {
  return targetId.includes(END) && !targetId.includes(SWITCH_END);
}

export function adjustSwitchHandle(edge, setNodes) {
  setNodes((nds) =>
    nds.map((node) => {
      let count = 1;
      if (node.id === edge[0].source) {
        count = node.data.handleCount;
        count = count - 1;
        node.data = {
          ...node.data,
          handleType: "custom",
          handleCount: count,
        };
      }

      return node;
    })
  );
}

export function deleteSwitch(
  id,
  nodes,
  edges,
  setNodes,
  setEdges,
  deleteElements
) {
  if (edges.filter((e) => e.source === id || e.target === id).length === 0) {
    //This means that the node is a orphan node and just need to delete it.
    deleteElements({ nodes: [{ id }] });
  } else {
    const switchEndNodeId =
      SWITCH_END + " _" + (Number(id.split("_", 2)[1]) + 1);

    const switchSuccessors = findSuccessors(edges, id);
    const switchEndAncestors = findAcestors(edges, switchEndNodeId);
    let nodesTobeDeleted = findIntersectionBetweenTwoArrays(
      switchSuccessors,
      switchEndAncestors
    ).concat([id, switchEndNodeId]);
    let remainingNodes = nodes.filter(
      (nd) => !nodesTobeDeleted.includes(nd.id)
    );

    const sourceEdge = edges.filter((e) => e.target === id)[0];

    const targetNode = edges.filter((e) => e.source === switchEndNodeId)[0]
      .target;
    // add filtered edges call here
    let { selectedEdges, remainingEdges } = filterSelectedEdges(
      edges,
      nodesTobeDeleted
    );
    const source = nodes.filter((nds) => nds.id === sourceEdge.source);
    const target = nodes.filter((nds) => nds.id === targetNode);
    const newEdge = {
      id: getId(sourceEdge.source + "-" + targetNode),
      source: sourceEdge.source,
      target: targetNode,
      animated: false,
      isUpdatable: true,
      sourceHandle: null,
      type: "custom",
      data: null,
      markerEnd: {
        type: "arrow",
      },
    };
    remainingEdges =
      remainingEdges.filter(
        (e) =>
          e.source.includes(sourceEdge.source) && e.target.includes(targetNode)
      ).length > 0
        ? remainingEdges
        : remainingEdges.concat(newEdge);

    let positionRightEdges = findRightmostEdges(edges, []);

    //if deleted node is directly connected to switch
    let connectedNode =
      edges.filter((e) => e.target.includes(id)).length > 0
        ? edges.filter((e) => e.target.includes(id))[0].source
        : null;
    if (connectedNode.includes(SWITCH) && !connectedNode.includes(SWITCH_END)) {
      remainingNodes = remainingNodes.map((n) => {
        if (n.id.includes(connectedNode)) {
          n = {
            ...n,
            data: {
              ...n.data,
              handleCount: n.data.handleCount - 1,
            },
          };
          return n;
        } else {
          return n;
        }
      });
      remainingEdges = adjustSourceHandleForSwitch(
        remainingEdges,
        connectedNode,
        positionRightEdges
      );
    }
    setNodes(remainingNodes);
    setEdges(remainingEdges);
  }
}

export function deleteStage(
  id,
  nodes,
  edges,
  setNodes,
  setEdges,
  deleteElements
) {
  // When the context state to delete has manual edges attached to it - do not delete the stage

  if (edges.filter((e) => e.source === id || e.target === id).length === 0) {
    //This means that the node is a orphan node and just need to delete it.
    deleteElements({ nodes: [{ id }] });
  } else {
    const switchEndNodeId =
      SWITCH_END + " _" + (Number(id.split("_", 2)[1]) + 1);

    const switchSuccessors = findTaskSuccessors(edges, id);
    let remainingNodes = nodes.filter(
      (nd) =>
        !switchSuccessors.filter((s) => s.includes("Task")).includes(nd.id)
    );
    let nodesTobeDeleted = nodes.filter(
      (nd) => switchSuccessors.includes(nd.id) && !nd.id.includes("Stage")
    );
    nodesTobeDeleted.push(nodes.filter((n) => n.id === id)[0]);
    remainingNodes = remainingNodes.filter((nd) => !(nd.id === id));

    const sourceEdge = edges
      .filter((e) => e.target === id)
      ?.filter((e) => !e.source.includes(999))[0];

    const targetEdges = edges
      .filter((e) => e.source === id)
      ?.filter((e) => e.target.includes("Stage"));
    const targetNode =
      targetEdges?.length > 0 ? targetEdges[0].target : undefined;

    // add filtered edges call here
    let { selectedEdges, remainingEdges } = filterSelectedEdges(
      edges,
      nodesTobeDeleted.map((nd) => nd.id)
    );

    if (sourceEdge && targetNode) {
      const newEdge = {
        id: getId(sourceEdge.source + "-" + targetNode),
        source: sourceEdge.source,
        target: targetNode,
        animated: false,
        isUpdatable: true,
        sourceHandle: null,
        type: "custom",
        data: null,
        markerEnd: {
          type: "arrow",
        },
      };

      const newEdgeInsertPos = remainingEdges
        .map((e) => e.target)
        .indexOf(newEdge.target);

      remainingEdges =
        remainingEdges.filter(
          (e) =>
            e.source.includes(sourceEdge.source) &&
            e.target.includes(targetNode) &&
            e.data?.edgeDrawnBy != "manual"
        ).length > 0
          ? remainingEdges
          : [
              ...remainingEdges.slice(0, newEdgeInsertPos + 1),
              newEdge,
              ...remainingEdges.slice(newEdgeInsertPos + 1),
            ];
    }

    const duplicateEdgesId = [];
    const seenEdge = [];
    remainingEdges.forEach((re) => {
      const key = `${re.source}-${re.target}`;
      if (seenEdge.includes(key)) {
        duplicateEdgesId.push(key);
      } else {
        seenEdge.push(key);
      }
    });

    remainingEdges = remainingEdges.filter(
      (re) =>
        !(
          existsInDuplicate(duplicateEdgesId, re.id) &&
          re.data?.edgeDrawnBy === "manual"
        )
    );

    remainingEdges = remainingEdges.map((e) => {
      if (
        e.source.includes("Stage") &&
        e.target.includes("Stage") &&
        !e.source.includes("999")
      ) {
        e.sourceHandle = "right";
        e.targetHandle = "left";
      }

      return e;
    });

    // if only 1 node - then it is root node & it should show
    if (remainingNodes.length === 1) {
      remainingNodes[0]["hidden"] = false;
      remainingEdges = [];
    }

    setNodes(remainingNodes);
    setEdges(remainingEdges);
  }
}

function existsInDuplicate(duplicateEdgesId, id) {
  let result = false;
  for (var dei of duplicateEdgesId) {
    if (id.includes(dei)) {
      result = true;
      break;
    }
  }
  return result;
}

//For a given node, find all the previous nodes.
export function findAcestors(edges, nodeId) {
  let prevNodes = new Set<any>();
  //To find the previous nodes, loop through the edges array. Find the edge which has the current node as target. Get the source for that edge and save it in the prevNodes array. Call the fucntion again with the sourceNode.
  //So sourcenode of one edge is the targetnode of previous edge.
  function matchTargetToSource(currentNode) {
    for (const edge of edges) {
      if (edge.target === currentNode) {
        prevNodes.add(edge.source);
        matchTargetToSource(edge.source);
      }
    }
  }

  matchTargetToSource(nodeId);
  return Array.from(prevNodes);
}

//Use this function to find out the nodes which are connected to the given node.
export function findSuccessors(edges, sourceNodeId) {
  let nextNodes = new Set<any>();
  //To find the connected node, loop through the edges array and find out the target for the given node. This target is the next node. so pass this target to the same function and get the next node (recursive)
  function matchSourceToTarget(currentNode) {
    for (const edge of edges) {
      if (edge.source === currentNode) {
        nextNodes.add(edge.target);
        matchSourceToTarget(edge.target);
      }
    }
  }

  matchSourceToTarget(sourceNodeId);
  return Array.from(nextNodes);
}

export function findTaskSuccessors(edges, sourceNodeId) {
  const filteredEdges = edges.filter(
    (e) => !(e.source.includes("Stage") && e.target.includes("Stage"))
  );
  let nextNodes = new Set<any>();
  //To find the connected node, loop through the edges array and find out the target for the given node. This target is the next node. so pass this target to the same function and get the next node (recursive)
  function matchSourceToTarget(currentNode) {
    for (const edge of filteredEdges) {
      if (edge.source === currentNode) {
        nextNodes.add(edge.target);
        matchSourceToTarget(edge.target);
      }
    }
  }

  matchSourceToTarget(sourceNodeId);
  return Array.from(nextNodes);
}

export function findIntersectionBetweenTwoArrays(
  arr1: String[],
  arr2: String[]
) {
  let intersection = [];
  arr1.forEach((e) => {
    if (arr2.includes(e) && !intersection.includes(e)) {
      intersection.push(e);
    }
  });
  return intersection;
}

export function filterSelectedEdges(edges, nodesToBeDeleted) {
  let selectedEdges = [];
  let remainingEdges = [];

  for (let i = 0; i < edges.length; i++) {
    if (
      nodesToBeDeleted.includes(edges[i].source) ||
      nodesToBeDeleted.includes(edges[i].target)
    ) {
      selectedEdges = selectedEdges.concat(edges[i]);
    }
  }

  for (let i = 0; i < edges.length; i++) {
    if (
      !nodesToBeDeleted.includes(edges[i].source) &&
      !nodesToBeDeleted.includes(edges[i].target)
    ) {
      remainingEdges = remainingEdges.concat(edges[i]);
    }
  }
  return { selectedEdges, remainingEdges };
}

export function findRightmostEdges(edges, connectedEdges) {
  const rightmostEdges = [];
  edges.forEach((element) => {
    if (!connectedEdges.includes(element)) {
      // Check if the element is positioned to the right of connectedEdges
      const indexOfElement = edges.indexOf(element);
      const indexOfConnectedEdges = edges.indexOf(connectedEdges[0]);

      if (indexOfElement > indexOfConnectedEdges) {
        rightmostEdges.push(element);
      }
    }
  });
  return rightmostEdges;
}

export function findEdgeIfNodeConnectedToSwitch(edges, id) {
  const edge = edges.filter(
    (e) =>
      e.target === id &&
      e.source.includes(SWITCH) &&
      !e.source.includes(SWITCH_END)
  );
  return edge;
}

export function getLabelOnEdge(data: any) {
  return data?.label?.length > 1
    ? "*"
    : data?.label?.length === 1
    ? data?.label[0]
    : "";
}
