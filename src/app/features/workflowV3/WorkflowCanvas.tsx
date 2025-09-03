import { Popover, Stack } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { CustomControl } from "./control/CustomControl";
import HoverText from "./utils/HoverText";

import { NodeTypes } from "./enum/NodeTypes";

import { WorkflowProvider } from "./context/WorkflowContext";
import ExecutionMenuDialog from "./dialogs/ExecutionMenuDialog";

import ManageApp from "./dialogs/ManageApp/ManageApp";
import { ConductorType } from "./enum/ConductorType";
import { WorkflowTypes } from "./enum/MenuTypes";
import { TaskStatusTypes } from "./enum/TaskStatus";
import { useCreateWaitTaskURL } from "./hooks/useCreateWaitTaskUrl";
import { useCreateWorkflowWaitTask } from "./hooks/useCreateWorkflowWaitTask";
import { useStringUtils } from "./hooks/useStringUtils";
import { useUniqueNodeId } from "./hooks/useUniqueNodeId";
import { useUniqueTaskName } from "./hooks/useUniqueTaskName";
import {
  IAssetSubType,
  IAssetType,
  INodeCategory,
  INodeData,
  INodeSubCategory,
  ITriggerData,
} from "./model/NodeData";
import { IExecutionMenuItem, IWorkflowTask } from "./model/workflowTask";
// import LoadingOverlay from "./notificationBoundry/LoadingOverlay";
import { nodeRegistry } from "./registry/NodeRegistry";
import { BasePanel } from "./rightPanel/BasePanel";
import { Trigger } from "./trigger/Trigger";
import WorkflowToolbar from "./WorkflowToolbar";
import { nodesList } from "./mock/nodesData";
import NodeDockDrawer from "./nodeMenu/NodeDockDrawer";
import NodeLibraryDock from "./nodeMenu/NodeLibraryDock";

import NodeLibraryMenu from "./nodeMenu/NodeLibraryMenu";
import { NodeLibraryTypes } from "./enum/NodeLibraryType";

const INITIAL_X = 200; // X position for the first node
const INITIAL_Y = 250; // Y position for the first node

interface WorkflowCanvasProps {
  workflowType: string;
  assetTypes: IAssetType[];
  assetSubTypes: IAssetSubType[];
  workflowDataChangeHandle: (
    nodes: Node<any, string>[],
    edges: Edge<any>[],
    tasks: IWorkflowTask[],
    trigger: ITriggerData
  ) => void;
  nodeCategory: any[];
  nodeSubCategory: any[];
  companyId: number;
  solutionKey: string;
  applicationKey: string;
  isReadOnly: boolean;
  executionWorkflow: Record<string, any>;
  executionList: IExecutionMenuItem[];
  selectedExecution: IExecutionMenuItem;
  canvasNodes: Node[];
  canvasEdges: Edge[];
  workflowTasks: IWorkflowTask[];
  counterRef: number;
  workflowTypeChangeHandler: (type: WorkflowTypes) => void;
  executionSelectionHandler: (execution: IExecutionMenuItem) => void;
  onDeleteSubCat: (subCat: INodeSubCategory) => void;
  onUpdateSubCat: (subCat: INodeSubCategory) => void;
  onCreateSubCat: (subCat: INodeSubCategory) => void;
  refreshCurrentExecution: () => void;
  refreshExecutions: () => void;
  isLoading: boolean;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflowType,
  nodeCategory,
  nodeSubCategory,
  assetTypes,
  assetSubTypes,
  workflowDataChangeHandle,
  companyId,
  isReadOnly,
  executionWorkflow,
  canvasNodes,
  canvasEdges,
  workflowTasks,
  counterRef,
  executionList,
  selectedExecution,
  workflowTypeChangeHandler,
  executionSelectionHandler,
  onDeleteSubCat,
  onUpdateSubCat,
  onCreateSubCat,
  refreshCurrentExecution,
  refreshExecutions,
  solutionKey,
  applicationKey,
  isLoading,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(canvasNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(canvasEdges || []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [lastNodeId, setLastNodeId] = useState<string | null>(null);

  const [lastNodeData, setLastNodeData] = useState<INodeData | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [workflowTask, setWorkflowTask] = useState<IWorkflowTask[]>(
    workflowTasks || []
  );
  const [selectedNode, setSelectedNode] = useState<Node<INodeData> | null>(
    null
  );
  const [selectedSwitchNodes, setSelectedSwitchNodes] = useState<Node[]>([]);
  const [isHorizontal, toggleHorizontal] = useState<boolean>(true);
  const [settingsCategory, setSettingsCategory] = useState<string>();
  const getWaitCallBackUrl = useCreateWaitTaskURL();
  const getWaitTask = useCreateWorkflowWaitTask();
  const { generateUniqueNodeId } = useUniqueNodeId(nodes);
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      console.log("onConnect Params", params);

      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );
  const { removeSpecialCharsAndSpaces } = useStringUtils();
  const { generateUniqueTaskName } = useUniqueTaskName();

  const [refreshKey, setRefreshKey] = useState(0);
  const [showExecutionMenu, setShowExecutionMenu] = useState<boolean>(false);
  // const position = useMemo(() => {
  //   return isHorizontal
  //     ? { x: INITIAL_X + nodes.length * 300, y: INITIAL_Y }
  //     : { x: INITIAL_X, y: INITIAL_Y + nodes.length * 100 };
  // }, [isHorizontal, nodes]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [nodeLibraryType, setNodeLibraryType] = useState<string>(
    NodeLibraryTypes.NODE_CATEGORY
  );

  const position = useMemo(() => {
    return isHorizontal
      ? { x: INITIAL_X + nodes.length * 300, y: INITIAL_Y + nodes.length * 50 }
      : { x: INITIAL_X, y: INITIAL_Y + nodes.length * 100 };
  }, [isHorizontal, nodes]);

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
    const trigger: ITriggerData = nodes.find((el) => {
      return el.type === NodeTypes.Trigger;
    })?.data.formData as ITriggerData;

    workflowDataChangeHandle(nodes, edges, workflowTask, trigger);
  }, [edges, nodes, workflowDataChangeHandle, workflowTask]);

  useEffect(() => {
    setNodes(canvasNodes || []);
    setEdges(canvasEdges || []);
    setWorkflowTask(workflowTasks || []);
  }, [canvasNodes, canvasEdges, workflowTasks, counterRef]);

  useEffect(() => {
    updateNodesEndState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node: Node<INodeData>) => ({
        ...node,
        data: { ...node.data, isHorizontal },
      }))
    );
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        type: "simplebezier",
        markerEnd: { type: MarkerType.ArrowClosed },
        sourceHandle: isHorizontal ? "right" : "bottom",
        targetHandle: isHorizontal ? "left" : "top",
      }))
    );
    setRefreshKey((prev) => prev + 1);
  }, [isHorizontal, setNodes, setEdges]);

  useEffect(() => {
    if (isReadOnly && executionWorkflow && canvasNodes) {
      const updatedNodes = canvasNodes.map((nodeItem: Node<INodeData>) => {
        return {
          ...nodeItem,
          data: {
            ...nodeItem.data,
            readonly: true,
            status: executionWorkflow[nodeItem.id]?.status,
            formError:
              executionWorkflow[nodeItem.id]?.status === TaskStatusTypes.FAILED
                ? true
                : false,
            formErrorMessage: executionWorkflow[nodeItem.id]?.status,
          },
        };
      });
      setNodes(updatedNodes);
    } else {
      setNodes(canvasNodes);
    }
  }, [isReadOnly, executionWorkflow, canvasNodes]);

  const getAllSwitchChildren = (_: Node) => {
    const switchNode = nodesList.find((node) => node.type === NodeTypes.Switch);
    const switchChildren = switchNode?.data?.nextNodes || [];
    const childrenNodes = nodesList.filter((node) =>
      switchChildren.includes(node.id)
    );
    return childrenNodes;
  };

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log(event);
    if (node.type === NodeTypes.StickyNote) {
      return;
    }

    // event.preventDefault();
    // setSelectedNode(node as Node<INodeData>);
    // setInputValue("");
    // setAnchorEl(event.currentTarget as HTMLElement);
    event.preventDefault();

    if (node.type === NodeTypes.Switch) {
      const switchChildren = getAllSwitchChildren(node);
      setSelectedSwitchNodes(switchChildren);
      setDrawerOpen(true);
    }

    setSelectedNode(node as Node<INodeData>);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedNode(null);
  }, []);

  const onRenameNode = useCallback(
    (newLabel: string, nodeId: string) => {
      if (nodeId) {
        setNodes((nds) =>
          nds.map((node: Node<INodeData>) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, nodeLabel: newLabel } }
              : node
          )
        );
      }
    },
    [setNodes]
  );

  const deleteTasksByNodeIdPrefix = (uuid: string) => {
    if (!uuid) return;

    setWorkflowTask((prevTasks) =>
      prevTasks.filter(
        (task) =>
          !task.taskReferenceName ||
          !task.taskReferenceName.startsWith(`${uuid}-`)
      )
    );
  };

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) =>
        prevNodes
          .filter((node) => node.id !== nodeId)
          .map((node) => {
            const updatedSourceNodes = (
              node.data?.sourceNodes as string[]
            )?.filter((id: string) => id !== nodeId);
            if (
              node.data?.sourceNodes &&
              updatedSourceNodes.length !==
                (node.data?.sourceNodes as string[])?.length
            ) {
              return {
                ...node,
                data: {
                  ...node.data,
                  sourceNodes: updatedSourceNodes,
                },
              };
            }
            return node;
          })
      );

      // delete edges
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

      // delete tasks
      deleteTasksByNodeIdPrefix(nodeId);
      setRefreshKey((prev) => prev + 1);
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
        setNodes((prevNodes) =>
          prevNodes
            .filter((node) => !nodesToDelete.has(node.id))
            .map((node) => {
              const updatedSourceNodes = (
                node.data?.sourceNodes as string[]
              )?.filter((id: string) => id !== nodeId);
              if (
                node.data?.sourceNodes &&
                updatedSourceNodes.length !==
                  (node.data?.sourceNodes as string[])?.length
              ) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    sourceNodes: updatedSourceNodes,
                  },
                };
              }
              return node;
            })
        );

        setEdges((eds) =>
          eds.filter(
            (edge) =>
              !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target)
          )
        );

        // delete tasks too
        nodesToDelete.forEach((el) => deleteTasksByNodeIdPrefix(el));

        handleCloseDrawer();
      }
    },
    [edges, setNodes, setEdges, handleCloseDrawer]
  );
  const onAddAction = useCallback(
    (
      nodeId: string,
      position: { x: number; y: number },
      nodeData: INodeData
    ) => {
      setMenuPosition(position);
      setMenuOpen((prev) => !prev);
      setLastNodeId(nodeId);
      setLastNodeData(nodeData);
    },
    [setMenuPosition, setMenuOpen, setLastNodeId, setLastNodeData]
  );

  /**
   * This function ensures that:
   * 1. Wait tasks are placed immediately after their corresponding node tasks
   * 2. WORKFLOW_STATUS_UPDATE task is always at the end
   */
  const ensureMandatoryTaskAtEnd = useCallback((tasks: IWorkflowTask[]) => {
    if (!tasks.length) return [];
    const waitTaskMap = new Map<string, IWorkflowTask>();
    let statusUpdateTask: IWorkflowTask | undefined;

    const regularTasks = tasks.filter((task) => {
      // Extract the status update task
      if (task.name === "WORKFLOW_STATUS_UPDATE") {
        statusUpdateTask = task;
        return false;
      }
      // Extract wait tasks and map them by UUID prefix
      if (task.name === "waitTask" && task.taskReferenceName) {
        const uuidPrefix = task.taskReferenceName.split("-")[0];
        waitTaskMap.set(uuidPrefix, task);
        return false;
      }
      return true;
    });

    // Second pass: build the reordered task list
    const reorderedTasks: IWorkflowTask[] = [];

    // Process regular tasks and insert wait tasks where needed
    regularTasks.forEach((task) => {
      reorderedTasks.push(task);

      // Check if this task has a corresponding wait task
      if (task.id) {
        const uuidPrefix = task.id.split("-")[0];
        const waitTask = waitTaskMap.get(uuidPrefix);

        if (waitTask) {
          reorderedTasks.push(waitTask);
          waitTaskMap.delete(uuidPrefix); // Mark as processed
        }
      }
    });

    // Add any orphaned wait tasks that weren't matched
    if (waitTaskMap.size > 0) {
      console.warn(
        `Found ${waitTaskMap.size} wait tasks without matching processor tasks`
      );
      waitTaskMap.forEach((waitTask) => reorderedTasks.push(waitTask));
    }

    // Add the status update task at the end if it exists
    if (statusUpdateTask) {
      reorderedTasks.push(statusUpdateTask);
    }

    return reorderedTasks;
  }, []);

  const onUpdateTask = useCallback(
    (
      nodeId: string,
      task: IWorkflowTask,
      inputParameters?: Record<string, any>,
      preferredTaskName?: string
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
          return ensureMandatoryTaskAtEnd(updatedTasks);
        });
        return workflowTask[foundTaskIndex].taskReferenceName;
      } else {
        // Task doesn't exist, append it and increase count
        // generateUniqueTaskName  - generates task name and update the count
        // preferredTaskName - this is used usually for wait task preferred name is provided and that time generateUniqueTaskName wont be used
        const taskName =
          preferredTaskName ?? generateUniqueTaskName(nodeId, task);
        const newTask: IWorkflowTask = {
          ...task,
          id: newTaskId,
          taskReferenceName: taskName,
          inputParameters,
        };

        setWorkflowTask((prev) => {
          const updatedTasks = [...prev, newTask];
          return ensureMandatoryTaskAtEnd(updatedTasks);
        });
        return taskName;
      }
    },

    [
      ensureMandatoryTaskAtEnd,
      generateUniqueTaskName,
      removeSpecialCharsAndSpaces,
      workflowTask,
    ]
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
          formError: false,
          formErrorMessage: undefined,
        },
      };

      const updatedNodes = nodes.map((nodeItem: Node<INodeData>) => {
        if (nodeItem.id === node.id) {
          return tempSelectedNode;
        }
        return nodeItem;
      });
      setNodes(updatedNodes);
      setSelectedNode(tempSelectedNode);
      // setNotification({
      //   message: `Successfully saved the configuration`,
      //   type: "success",
      //   status: true,
      //   title: "Success",
      // });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes]
  );

  const handleInputParameterByConductorType = useCallback(
    (
      conductorType: string,
      isWaitTaskAdded: boolean,
      waitTaskName: string,
      inputParameters?: Record<string, any>
    ): Record<string, any> => {
      const callbackUrl = isWaitTaskAdded
        ? getWaitCallBackUrl(waitTaskName, false)
        : undefined;
      const callbackFailedUrl = isWaitTaskAdded
        ? getWaitCallBackUrl(waitTaskName, true)
        : undefined;
      switch (conductorType) {
        case ConductorType.HTTP: {
          const updatedParams = { ...(inputParameters ?? {}) };
          updatedParams.http_request = updatedParams.http_request || {};
          // Update the body with callback URLs
          updatedParams.http_request.body = {
            ...(updatedParams.http_request.body || {}),
            callbackUrl,
            callbackFailedUrl,
          };
          return updatedParams;
        }
        default: {
          return {
            ...(inputParameters ?? {}),
            callbackUrl,
            callbackFailedUrl,
          };
        }
      }
    },
    [getWaitCallBackUrl]
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
        const waitTaskName = generateUniqueTaskName(node.id, waitTask);
        updatedInputParameter = handleInputParameterByConductorType(
          node.data.conductorConfig.type,
          isWaitTaskAdded,
          waitTaskName,
          inputParameters
        );

        onUpdateFormDataForNode(
          node,
          formData,
          isWaitTaskAdded,
          waitTaskName,
          updatedInputParameter
        );
        // when wait task added add the main task and then wait task
        onUpdateTask(node.id, task, updatedInputParameter);
        onUpdateTask(node.id, waitTask, undefined, waitTaskName);
      } else {
        onDeleteTask(node.data?.formData?.waitTaskRef);
        updatedInputParameter = handleInputParameterByConductorType(
          node.data.conductorConfig.type,
          isWaitTaskAdded,
          undefined,
          inputParameters
        );
        onUpdateFormDataForNode(
          node,
          formData,
          false,
          undefined,
          updatedInputParameter
        );
        onUpdateTask(node.id, task, updatedInputParameter);
      }
    },
    [
      generateUniqueTaskName,
      getWaitTask,
      handleInputParameterByConductorType,
      onDeleteTask,
      onUpdateFormDataForNode,
      onUpdateTask,
    ]
  );

  const addSourcesToTargetNode = (targetId: string, sourceId: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === targetId
          ? {
              ...node,
              data: {
                ...node.data,
                sourceNodes: [
                  ...((node?.data?.sourceNodes as string[]) || []),
                  sourceId,
                ],
              },
            }
          : node
      )
    );
  };

  const edgesAreSame = (a: Edge[], b: Edge[]) =>
    a.length === b.length &&
    a.every(
      (edge, i) =>
        edge.id === b[i].id &&
        edge.source === b[i].source &&
        edge.target === b[i].target
    );

  useEffect(() => {
    if (nodes.length > 0) {
      const newEdges: Edge[] = [];
      nodes.forEach((node) => {
        if (node.data.targetNode) {
          newEdges.push({
            id: `edge-${node.data.targetNode}-${node.id}`,
            source: node.data.targetNode as string,
            sourceHandle: node.id,
            target: node.id,
            targetHandle: "left",
            type: "simplebezier",
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { strokeWidth: 2 },
          });
        }
      });
      setEdges((prevEdges) => {
        if (!edgesAreSame(prevEdges, newEdges)) {
          return newEdges;
        }
        return prevEdges;
      });
    }
  }, [nodes]);

  const handleAddSwitchNode = useCallback(
    (node: INodeSubCategory) => {
      const switchNodeId = generateUniqueNodeId();
      const switchNode: Node<INodeData> = {
        id: switchNodeId,
        type: "switch",
        position: position,
        data: {
          id: switchNodeId,
          isEndNode: true,
          isHorizontal,
          ...node,
          readonly: false,
          status: null,
          formError: false,
          formErrorMessage: "",
          nodeLabel: "Switch",
          nodeType: "switch",
          nodeIcon: "Shuffle",
          nodeIconColor: "blue",
          targetNode: lastNodeData?.id,
        },
      };
      setNodes((nds) => [...nds, switchNode]);

      if (lastNodeData) {
        addSourcesToTargetNode(lastNodeData.id, switchNodeId);
      }
      setLastNodeData(switchNode.data);
      setMenuOpen(false);
      setRefreshKey((prev) => prev + 1);
    },
    [
      generateUniqueNodeId,
      position,
      isHorizontal,
      setNodes,
      lastNodeId,
      edges.length,
      setEdges,
    ]
  );

  const addStickyNote = useCallback(() => {
    const newNodeId = generateUniqueNodeId();
    const newNode: Node<INodeData> = {
      id: newNodeId,
      type: NodeTypes.StickyNote,
      position: { x: 250, y: 100 },
      // draggable: false,
      data: {
        id: newNodeId,
        text: "New Note",
        isEndNode: false,
        isHorizontal: false,
        nodeName: `${NodeTypes.StickyNote}_${newNodeId}`,
        nodeIcon: "StickyNode2",
        nodeType: NodeTypes.StickyNote,
        nodeLabel: "New Note",
        nodeToolTip: "New Note",
        nodeOwner: "solution",
      },
      style: {
        zIndex: -1,
      },
    };
    setNodes((nds) => [newNode, ...nds]);
  }, [generateUniqueNodeId, setNodes]);

  const handleAddNode = useCallback(
    (node: INodeSubCategory) => {
      if (node?.nodeName === "Rules") {
        handleAddSwitchNode(node);
        return;
      }
      const newNodeId = generateUniqueNodeId();
      const newNode: Node<INodeData> = {
        id: newNodeId,
        type: node?.nodeType,
        position: position,
        data: {
          id: newNodeId,
          isEndNode: true,
          isHorizontal,
          ...node,
          readonly: false,
          status: null,
          formError: true,
          formErrorMessage: "configuration required",
          targetNode: lastNodeData?.id,
          mergeId: lastNodeData?.mergeId,
          nodePosition: position,
        },
        style: {
          background: "transparent", // <--- ✅ most important
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          padding: 0,
        },
      };
      setNodes((nds) => [...nds, newNode]);
      if (lastNodeData) {
        addSourcesToTargetNode(lastNodeData.id, newNodeId);
      }
      setLastNodeData(newNode.data);
      setMenuOpen(false);
      setRefreshKey((prev) => prev + 1);
      return newNode;
    },
    [
      generateUniqueNodeId,
      position,
      isHorizontal,
      setNodes,
      lastNodeId,
      edges.length,
      nodes,
      setEdges,
    ]
  );

  const onTriggerClick = useCallback(() => {
    const triggerNode: INodeSubCategory = nodeSubCategory.find(
      (e) => e.nodeType === NodeTypes.Trigger
    );

    handleAddNode(triggerNode);
  }, [handleAddNode, nodeSubCategory]);

  // const handleClickOutsideMenu = useCallback(() => {
  //   setMenuOpen(false);
  // }, [menuOpen, setMenuOpen]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  // const handleSave = () => {
  //   if (selectedNode) {
  //     setNodes((nds) =>
  //       nds.map((node) =>
  //         node.id === selectedNode.id
  //           ? { ...node, data: { ...node.data, label: inputValue } }
  //           : node
  //       )
  //     );
  //   }
  //   handleClose();
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setSelectedNode(null);
  // };

  return (
    <Stack sx={{ height: "100%", width: "100%", position: "relative" }}>
      {/* <LoadingOverlay loading={settingsCategory == null && isLoading} /> */}
      <WorkflowToolbar
        isReadOnly={isReadOnly && executionList && executionList.length > 0}
        handleExecutionMenu={() => setShowExecutionMenu(true)}
        handleSaveWorkflow={onSaveWorkFlow}
        nodeCategory={nodeCategory}
        viewType={workflowType}
        handleSwitcher={workflowTypeChangeHandler}
        onSettingsMenuItemSelect={setSettingsCategory}
        handleRefresh={refreshCurrentExecution}
      />
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
            companyId,
            solutionKey,
            applicationKey,
          }}
        >
          <ReactFlow
            id={"ReactFlow"}
            key={refreshKey}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeRegistry}
            // panOnDrag={false} // ✅ Disable drag to pan
            // panOnScroll={false} // ✅ Disable scroll to pan
            // zoomOnScroll={false} // ✅ Disable scroll to zoom
            // zoomOnPinch={false} // ✅ Disable pinch to zoom
          >
            {isReadOnly && selectedExecution && (
              <HoverText title={selectedExecution.workflowId} />
            )}
            <Background />
            <Controls>
              <CustomControl
                isHorizontal={isHorizontal}
                toggleHorizontal={toggleHorizontal}
              />
            </Controls>
            <MiniMap nodeStrokeWidth={3} />
          </ReactFlow>

          {nodes.length === 0 && (
            <Trigger
              onAddTrigger={onTriggerClick}
              position={{ x: INITIAL_X, y: INITIAL_Y }}
            />
          )}
          {/* <NodeFactoryMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onSelect={handleAddNode}
            // onSelect={handleAddSwitchNode}
            position={menuPosition}
            nodeCategories={nodeCategory}
            nodeSubCategories={[...(nodeSubCategory ?? [])]}
            handleClickOutsideMenu={handleClickOutsideMenu}
          /> */}
          <NodeLibraryMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            nodeCategories={nodeCategory}
            onSelect={handleAddNode}
            nodeSubCategories={[...(nodeSubCategory ?? [])]}
            libraryType={nodeLibraryType}
          />
          {/* <NodeLibraryDock open={menuOpen} onClose={() => setMenuOpen(false)} /> */}
          {selectedNode && (
            <BasePanel
              companyId={companyId}
              assetTypes={assetTypes}
              assetSubTypes={assetSubTypes}
              drawerOpen={drawerOpen}
              toggleOpen={handleCloseDrawer}
              switchNodes={selectedSwitchNodes}
              node={selectedNode}
              executionWorkflow={
                isReadOnly ? executionWorkflow[selectedNode.id] : null
              }
              isReadOnly={isReadOnly}
            />
          )}

          {settingsCategory && (
            <ManageApp
              categoryType={settingsCategory}
              onCancel={() => setSettingsCategory(null)}
              nodeSubCategory={nodeSubCategory}
              nodeCategories={nodeCategory}
              onDeleteSubCat={onDeleteSubCat}
              onUpdateSubCat={onUpdateSubCat}
              onCreateSubCat={onCreateSubCat}
              isLoading={isLoading}
            />
          )}

          {/* <MergePopover
            open={open}
            anchorEl={anchorEl}
            // inputValue={inputValue}
            // handleInputChange={handleInputChange}
            // handleSave={handleSave}
            handleClose={handleClose}
            availableNodes={nodes}
            selectedNodes={[]}
            handleMergeNodes={function (nodes: Node[]): void {
              throw new Error("Function not implemented.");
            }}
          /> */}
          <ExecutionMenuDialog
            open={showExecutionMenu}
            onClose={() => setShowExecutionMenu(false)}
            executions={executionList}
            onSelectRow={executionSelectionHandler}
            handleRefresh={refreshExecutions}
          />
        </WorkflowProvider>
      </Stack>
    </Stack>
  );
};

export default WorkflowCanvas;
