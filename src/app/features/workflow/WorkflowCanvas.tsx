import { Stack } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  // addEdge,
  Background,
  // Connection,
  Controls,
  Edge,
  MarkerType,
  // MiniMap,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";

// import ReactFlow, {
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   Handle,
//   Position,
// } from "react-flow-renderer";
import "reactflow/dist/style.css";
// import { CustomControl } from "./control/CustomControl";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { NodeTypes } from "./enum/NodeTypes";

// import SaveIcon from "@mui/icons-material/Save";
import { v4 as uuidv4 } from "uuid";
import { WorkflowProvider } from "./context/WorkflowContext";
import { useCreateWaitTaskURL } from "./hooks/useCreateWaitTaskUrl";
import { useCreateWorkflowWaitTask } from "./hooks/useCreateWorkflowWaitTask";
import { useStringUtils } from "./hooks/useStringUtils";
import {
  IAssetSubType,
  IAssetType,
  INodeCategory,
  INodeData,
  INodeSubCategory,
  ITriggerData,
} from "./model/NodeData";
import { IWorkflowTask } from "./model/workflowTask";
import NodeFactoryMenu from "./nodeMenu/NodeFactoryMenu";
// import { nodeRegistry } from "./registry/NodeRegistry";
import { BasePanel } from "./rightPanel/BasePanel";
import { Trigger } from "./trigger/Trigger";
import WorkflowToolbar from "./WorkflowToolbar";
import AddAppDialog from "./dialogs/AddAppDialog";
import CustomNode from "./CustomNode";

const INITIAL_X = 200; // X position for the first node
const INITIAL_Y = 250; // Y position for the first node

const menuOptions = ["Add App"];

// const initialEdges = [];

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "custom", // Use the custom node type
    position: { x: 0, y: 0 },
    data: { label: "Auto Loan Solution" },
  },
];

// const initialNodes = [
//   {
//     id: "1",
//     type: "custom",
//     position: { x: 300, y: 100 },
//     data: { label: "AI Agent" },
//   },
//   {
//     id: "2",
//     type: "custom",
//     position: { x: 300, y: 300 },
//     data: { label: "Auto Loan Solution" },
//   },
//   {
//     id: "3",
//     type: "custom",
//     position: { x: 100, y: 500 },
//     data: { label: "Credentials" },
//   },
//   {
//     id: "4",
//     type: "custom",
//     position: { x: 300, y: 500 },
//     data: { label: "Dashboard" },
//   },
//   {
//     id: "5",
//     type: "custom",
//     position: { x: 500, y: 500 },
//     data: { label: "Trigger" },
//   },
// ];

// const initialEdges = [
//   {
//     id: "e1-2",
//     source: "1",
//     sourceHandle: "output-1",
//     target: "2",
//     targetHandle: "input-1",
//   },
//   {
//     id: "e3-2",
//     source: "3",
//     sourceHandle: "output-1",
//     target: "2",
//     targetHandle: "input-2",
//   },
//   {
//     id: "e4-2",
//     source: "4",
//     sourceHandle: "output-1",
//     target: "2",
//     targetHandle: "input-3",
//   },
//   {
//     id: "e2-3",
//     source: "2",
//     sourceHandle: "output-2",
//     target: "3",
//     targetHandle: "input-1",
//   },
//   {
//     id: "e2-4",
//     source: "2",
//     sourceHandle: "output-1",
//     target: "4",
//     targetHandle: "input-1",
//   },
//   {
//     id: "e2-5",
//     source: "2",
//     sourceHandle: "output-3",
//     target: "5",
//     targetHandle: "input-1",
//   },
// ];

const initialEdges = [];

interface WorkflowCanvasProps {
  assetTypes: IAssetType[];
  assetSubTypes: IAssetSubType[];
  workflowDataChangeHandle: (
    nodes: Node<any, string>[],
    edges: Edge<any>[],
    tasks: IWorkflowTask[],
    tasksRefCounter: number,
    trigger: ITriggerData
  ) => void;
  nodeCategory: INodeCategory[];
  nodeSubCategory: INodeSubCategory[];
  companyId: number;
  isReadOnly: boolean;
  executionWorkflow: Record<string, any>;
}

// const ParentNode = ({ data }) => {
//   return (
//     <div
//       style={{
//         padding: "20px",
//         background: "#007bff",
//         color: "white",
//         borderRadius: "5px",
//       }}
//     >
//       {data.label}
//       {/* Add handles for edges to connect */}
//       <Handle type="source" position={Position.Right} id="right-1" />
//       <Handle type="source" position={Position.Right} id="right-2" />
//       <Handle type="source" position={Position.Right} id="right-3" />
//       {/* Add more handles as needed */}
//     </div>
//   );
// };

// const nodeTypes = {
//   parent: ParentNode, // Register the custom parent node
// };

// const initialNodes = [
//   {
//     id: "1",
//     type: "parent", // Use the custom parent node type
//     position: { x: 0, y: 0 },
//     data: { label: "Parent Node" },
//   },
// ];

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodeCategory,
  nodeSubCategory,
  assetTypes,
  assetSubTypes,
  workflowDataChangeHandle,
  companyId,
  isReadOnly,
  executionWorkflow,
}) => {
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [lastNodeId, setLastNodeId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [workflowTask, setWorkflowTask] = useState<IWorkflowTask[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<INodeData> | null>(
    null
  );
  const [isHorizontal] = useState<boolean>(true);
  const taskCountRef = useRef<number>(0);
  const getWaitCallBackUrl = useCreateWaitTaskURL();
  const getWaitTask = useCreateWorkflowWaitTask();

  // const onConnect = useCallback(
  //   (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );
  const { removeSpecialCharsAndSpaces } = useStringUtils();

  const [onAddApp, setOnAddApp] = useState<boolean>(false);

  const position = useMemo(() => {
    return isHorizontal
      ? { x: INITIAL_X + nodes.length * 300, y: INITIAL_Y }
      : { x: INITIAL_X, y: INITIAL_Y + nodes.length * 100 };
  }, [isHorizontal, nodes]);

  React.useEffect(() => {
    const handlePlusClick = (event) => {
      const { nodeId, handleId } = event.detail;
      console.log("node id", nodeId);

      // Create a new node
      const newNodeId = (nodes.length + 1).toString();
      const newNode = {
        id: newNodeId,
        type: "custom",
        // position: {
        //   x: 200,
        //   y: 100,
        // },
        position: {
          x: nodes.find((n) => n.id === nodeId).position.x + 200,
          y:
            nodes.find((n) => n.id === nodeId).position.y +
            (nodes.length - 1) * 100,
        },
        data: { label: `Node ${newNodeId}` },
      };

      // Create a new edge from the clicked handle to the new node
      const newEdge = {
        id: `e${nodeId}-${newNodeId}`,
        source: nodeId,
        target: newNodeId,
        sourceHandle: handleId, // Use the clicked handle
        //  sourceHandle: "right",
        type: "bezier",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { strokeWidth: 3, stroke: "#666" },
      };

      // Update state
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    };

    window.addEventListener("handlePlusClick", handlePlusClick);
    return () => window.removeEventListener("handlePlusClick", handlePlusClick);
  }, [nodes]);

  const updateNodesEndState = useCallback(() => {
    const endNodeIds = new Set(nodes.map((node) => node.id));
    edges.forEach((edge) => {
      endNodeIds.delete(edge.source);
    });

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isEndNode: endNodeIds.has(node.id),
        },
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  const onSaveWorkFlow = useCallback(() => {
    const trigger: ITriggerData = {
      assetSubType: [],
      assetType: "",
      triggerEvent: "",
      triggerType: "",
    };

    // nodes.find((el) => {
    //   return el.type === NodeTypes.Trigger;
    // })?.data?.formData;

    workflowDataChangeHandle(
      nodes,
      edges,
      workflowTask,
      taskCountRef.current,
      trigger
    );
  }, [edges, nodes, workflowDataChangeHandle, workflowTask]);

  useEffect(() => {
    updateNodesEndState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges]);

  useEffect(() => {
    // setNodes((nds) =>
    //   nds.map((node: Node<INodeData>) => ({
    //     ...node,
    //     data: { ...node.data, isHorizontal },
    //   }))
    // );

    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        type: "bezier", // Keep or change type based on preference
        markerEnd: { type: MarkerType.ArrowClosed }, // Ensure arrow is present
        sourceHandle: isHorizontal ? "right" : "bottom",
        targetHandle: isHorizontal ? "left" : "top",
      }))
    );
  }, [isHorizontal, setNodes, setEdges]);

  useEffect(() => {
    if (isReadOnly && executionWorkflow) {
      // const updatedNodes = nodes.map((nodeItem: Node<INodeData>) => {
      //   return {
      //     ...nodeItem,
      //     readOnly: true,
      //     status: getNodeStatus(nodeItem.type),
      //   };
      // });
      // setNodes(updatedNodes);
    }
  }, [isReadOnly, executionWorkflow]);

  // const handleNodeClick = (event: React.MouseEvent, node: Node) => {
  //   console.log(event);

  //   setSelectedNode(node);
  //   setDrawerOpen(true);
  // };

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedNode(null);
  }, []);

  const onRenameNode = useCallback(
    (newLabel: string, nodeId: string) => {
      console.log(newLabel, nodeId);

      if (nodeId) {
        // setNodes((nds) =>
        //   nds.map((node: Node<INodeData>) =>
        //     node.id === nodeId
        //       ? { ...node, data: { ...node.data, nodeLabel: newLabel } }
        //       : node
        //   )
        // );
      }
    },
    [setNodes]
  );
  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));

      setEdges((prevEdges) => {
        // Find edges connected to the node being deleted
        const incomingEdges = prevEdges.filter(
          (edge) => edge.target === nodeId
        );
        const outgoingEdges = prevEdges.filter(
          (edge) => edge.source === nodeId
        );

        // Create new edges from sources of incomingEdges to targets of outgoingEdges
        const newEdges: Edge[] = [];
        incomingEdges.forEach((inEdge) => {
          outgoingEdges.forEach((outEdge) => {
            newEdges.push({
              id: `${inEdge.source}-${outEdge.target}`,
              source: inEdge.source,
              target: outEdge.target,
              label: outEdge.label || "", // Preserve label if any
              type: outEdge.type || "default", // Preserve edge type
            });
          });
        });

        // Remove edges related to the deleted node and add new edges
        return [
          ...prevEdges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
          ),
          ...newEdges,
        ];
      });
    },
    [setNodes, setEdges]
  );

  const onDeleteNodeWithChildren = useCallback(
    (nodeId: string) => {
      if (nodeId) {
        const nodesToDelete = new Set<string>([nodeId]);
        let edgesToCheck = edges.filter((edge) => edge.source === nodeId);

        while (edgesToCheck.length > 0) {
          const edge = edgesToCheck.pop()!;
          nodesToDelete.add(edge.target);
          edgesToCheck.push(...edges.filter((e) => e.source === edge.target));
        }

        setNodes((nds) => nds.filter((node) => !nodesToDelete.has(node.id)));
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target)
          )
        );

        handleCloseDrawer();
      }
    },
    [edges, setNodes, setEdges, handleCloseDrawer]
  );
  const onAddAction = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      setMenuPosition(position);
      setMenuOpen((prev) => !prev);
      setLastNodeId(nodeId);
    },
    [setMenuPosition, setMenuOpen, setLastNodeId]
  );

  const onUpdateTask = useCallback(
    (
      nodeId: string,
      task: IWorkflowTask,
      inputParameters?: Record<string, any>
    ): string => {
      const newTaskId: string = removeSpecialCharsAndSpaces(
        `${nodeId}-${task.name}`
      );
      const foundTaskIndex =
        workflowTask.length === 0
          ? -1
          : workflowTask.findIndex((t) => t.id === newTaskId);

      if (foundTaskIndex !== -1) {
        // Task exists, update it
        setWorkflowTask((prev) => {
          const updatedTasks = [...prev];
          const foundTask = updatedTasks[foundTaskIndex];
          updatedTasks[foundTaskIndex] = {
            ...task,
            id: foundTask.id,
            taskReferenceName: foundTask.taskReferenceName,
            inputParameters,
          };
          return updatedTasks;
        });
        return workflowTask[foundTaskIndex].taskReferenceName;
      } else {
        // Task doesn't exist, append it and increase count
        const taskName = `${task.taskReferenceName}-${taskCountRef.current}`;
        const newTask: IWorkflowTask = {
          ...task,
          id: newTaskId,
          taskReferenceName: taskName,
          inputParameters,
        };
        setWorkflowTask((prev) => [...prev, newTask]);
        taskCountRef.current++;
        return taskName;
      }
    },

    [removeSpecialCharsAndSpaces, workflowTask]
  );

  const onDeleteTask = useCallback(
    (taskReferenceName: string) => {
      const newWorkFlowTask: IWorkflowTask[] = workflowTask.filter(
        (el) => el.taskReferenceName !== taskReferenceName
      );
      setWorkflowTask(newWorkFlowTask);
    },
    [workflowTask]
  );

  const onUpdateFormDataForNode = useCallback(
    (
      node: Node<INodeData>,
      formData: Record<string, any>,
      isWaitTaskAdded?: boolean,
      waitTaskRef?: string,
      inputParameters?: Record<string, any>
    ) => {
      console.log(node);

      const tempSelectedNode: Node<INodeData> = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          //added form data
          formData: {
            ...selectedNode.data.formData,
            ...formData,
            waitTaskRef: isWaitTaskAdded ? waitTaskRef : undefined,
            callbackUrl: isWaitTaskAdded
              ? getWaitCallBackUrl(waitTaskRef, false)
              : undefined,
            callbackFailedUrl: isWaitTaskAdded
              ? getWaitCallBackUrl(waitTaskRef, true)
              : undefined,
            inputParameters,
          },
        },
      };

      // const updatedNodes = nodes.map((nodeItem: Node<INodeData>) => {
      //   if (nodeItem.id === node.id) {
      //     return tempSelectedNode;
      //   }
      //   return nodeItem;
      // });
      // setNodes(updatedNodes);
      setSelectedNode(tempSelectedNode);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes]
  );

  const getNodeStatus = useCallback(
    (nodeType: string) => {
      if (isReadOnly) {
        const nodeTask = executionWorkflow?.tasks.find(
          (workflow: Record<string, any>) => {
            return workflow.nodeType === nodeType;
          }
        );
        return nodeTask.status;
      }
      return null;
    },
    [executionWorkflow?.tasks, isReadOnly]
  );
  const onUpdateTaskAndNode = useCallback(
    (
      node: Node<INodeData>,
      task: IWorkflowTask,
      formData: Record<string, any>,
      inputParameters?: Record<string, any>,
      isWaitTaskAdded?: boolean
    ) => {
      let updatedInputParameter;
      if (isWaitTaskAdded) {
        const waitTask = getWaitTask(node.id);
        const waitTaskName = onUpdateTask(node.id, waitTask);
        updatedInputParameter = {
          ...(inputParameters ?? {}),
          callbackUrl: getWaitCallBackUrl(waitTaskName, false),
          callbackFailedUrl: getWaitCallBackUrl(waitTaskName, true),
        };

        onUpdateFormDataForNode(
          node,
          formData,
          isWaitTaskAdded,
          waitTaskName,
          updatedInputParameter
        );
      } else {
        onDeleteTask(node.data?.formData?.waitTaskRef);
        updatedInputParameter = {
          ...(inputParameters ?? {}),
          callbackUrl: undefined,
          callbackFailedUrl: undefined,
        };
        onUpdateFormDataForNode(
          node,
          formData,
          false,
          undefined,
          updatedInputParameter
        );
      }
      onUpdateTask(node.id, task, updatedInputParameter);
    },
    [
      getWaitCallBackUrl,
      getWaitTask,
      onDeleteTask,
      onUpdateFormDataForNode,
      onUpdateTask,
    ]
  );

  const handleAddNode = useCallback(
    (node: INodeSubCategory) => {
      const newNodeId = uuidv4();

      const newNode: Node<INodeData> = {
        id: newNodeId,
        type: node.nodeType,
        position: position,
        data: {
          id: newNodeId,
          isEndNode: true,
          isHorizontal,
          ...node,
          readonly: isReadOnly,
          status: getNodeStatus(node.nodeType),
          formError: true,
          formErrorMessage: "Sample error message",
        },
      };
      // setNodes((nds) => [...nds, newNode]);

      if (lastNodeId) {
        console.log("lastNodeId ***** activated");

        // Count existing edges from lastNodeId
        const existingEdges = edges.filter(
          (edge) => edge.source === lastNodeId
        );
        const edgeCount = existingEdges.length;

        // Define different positions for multiple edges
        const handlePositions = ["output-1", "output-2", "output-3"];
        const selectedHandle =
          handlePositions[edgeCount % handlePositions.length]; // Cycle through handles

        const newEdge: Edge = {
          id: `edge-${edges.length + 1}`,
          source: lastNodeId,
          sourceHandle: selectedHandle, // Assign different handle
          target: newNodeId,
          targetHandle: "input-1", // All target nodes can have input-1
          type: "bezier",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { strokeWidth: 3, stroke: "#666" },
        };

        setEdges((eds) => [...eds, newEdge]);
      }

      setLastNodeId(newNodeId);
      setMenuOpen(false);
      return newNode;
    },
    [
      position,
      isHorizontal,
      isReadOnly,
      getNodeStatus,
      setNodes,
      lastNodeId,
      edges,
      setEdges,
    ]
  );

  const onTriggerClick = useCallback(() => {
    const triggerNode: INodeSubCategory = nodeSubCategory.find(
      (e) => e.nodeType === NodeTypes.Trigger
    );

    handleAddNode(triggerNode);
  }, [handleAddNode, nodeSubCategory]);

  const handleMenuSelection = (selectedItem: string) => {
    console.log("Selected Menu Item:", selectedItem);
    if (selectedItem === "Add App") {
      setOnAddApp(true);
    }
  };

  const addNodeAndEdge = () => {
    const parentNode = nodes.find((node) => node.id === "1"); // Find the parent node
    if (!parentNode) return;

    // Create a new node
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      position: {
        x: parentNode.position.x + 200,
        y: parentNode.position.y + (nodes.length - 1) * 100,
      },
      data: { label: `Node ${newNodeId}` },
    };

    // Create a new edge from the parent node to the new node
    const newEdge = {
      id: `e1-${newNodeId}`,
      source: "1",
      target: newNodeId,
      sourceHandle: "right", // Use the right handle
    };

    // Update state
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  };

  console.log("workflowTask", workflowTask);
  console.log("nodes", nodes);

  return (
    <Stack sx={{ height: "100%", width: "100%", position: "relative" }}>
      <WorkflowToolbar
        onSaveWorkFlow={onSaveWorkFlow}
        isActive={false}
        onToggleActive={undefined}
        menuItems={menuOptions}
        onMenuItemSelect={handleMenuSelection}
      />
      {/* <Stack sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ width: "fit-content" }}
          startIcon={<SaveIcon sx={{ color: "#000" }} />}
          onClick={onSaveWorkFlow}
        >
          Save
        </Button>
      </Stack> */}
      <Stack sx={{ height: "100%", width: "100%", position: "relative" }}>
        <WorkflowProvider
          initialValue={{
            onAddAction,
            onDeleteNode,
            onDeleteNodeWithChildren,
            onRenameNode,
            onUpdateTask,
            onUpdateFormDataForNode,
            onDeleteTask,
            onUpdateTaskAndNode,
          }}
        >
          {/* <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls>
              <CustomControl
                isHorizontal={isHorizontal}
                toggleHorizontal={toggleHorizontal}
              />
            </Controls>
            <MiniMap nodeStrokeWidth={3} />
          </ReactFlow> */}
          {/* <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeRegistry}
          >
            <Background />
            <Controls>
              <CustomControl
                isHorizontal={isHorizontal}
                toggleHorizontal={toggleHorizontal}
              />
            </Controls>
            <MiniMap nodeStrokeWidth={3} />
          </ReactFlow> */}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={addNodeAndEdge}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
            }}
          >
            Add Node
          </Button>
          {nodes.length === 0 && (
            <Trigger
              onAddTrigger={onTriggerClick}
              position={{ x: INITIAL_X, y: INITIAL_Y }}
            />
          )}
          <NodeFactoryMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onSelect={handleAddNode}
            position={menuPosition}
            nodeCategories={nodeCategory}
            nodeSubCategories={nodeSubCategory}
          />
          {selectedNode && (
            <BasePanel
              companyId={companyId}
              assetTypes={assetTypes}
              assetSubTypes={assetSubTypes}
              drawerOpen={drawerOpen}
              toggleOpen={handleCloseDrawer}
              node={selectedNode}
              executionWorkflow={executionWorkflow}
              isReadOnly={isReadOnly}
            />
          )}
          {onAddApp && (
            <AddAppDialog
              showDialogue={onAddApp}
              onCancel={() => setOnAddApp(false)}
              onSubmit={() => setOnAddApp(false)}
            />
          )}
        </WorkflowProvider>
      </Stack>
    </Stack>
  );
};

export default WorkflowCanvas;
