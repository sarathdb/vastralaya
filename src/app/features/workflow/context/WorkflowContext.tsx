import React, { createContext, ReactNode, useContext } from "react";
import { Node } from "reactflow";
import { INodeData } from "../model/NodeData";
import { IWorkflowTask } from "../model/workflowTask";
// Define the context type
interface IWorkflowContext {
  onDeleteNode: (nodeId: string) => void;
  onAddAction: (nodeId: string, position: { x: number; y: number }) => void;
  onDeleteNodeWithChildren: (nodeId: string) => void;
  onRenameNode: (newLabel: string, nodeId: string) => void;
  onUpdateTask: (
    nodeId: string,
    task: IWorkflowTask,
    inputParameters?: Record<string, any>
  ) => string;
  onDeleteTask: (taskRefName: string) => void;
  onUpdateFormDataForNode: (
    node: Node<INodeData>,
    formData: Record<string, any>,
    isWaitTaskAdded?: boolean,
    waitTaskRef?: string,
    inputParameters?: Record<string, any>
  ) => void;

  onUpdateTaskAndNode: (
    node: Node<INodeData>,
    task: IWorkflowTask,
    formData: Record<string, any>,
    inputParameters?: Record<string, any>,
    isWaitTaskAdded?: boolean
  ) => void;
}

// Create the context
const WorkflowContext = createContext<IWorkflowContext | undefined>(undefined);

// Create the provider component
export const WorkflowProvider: React.FC<{
  children: ReactNode;
  initialValue: IWorkflowContext;
}> = ({ children, initialValue }) => {
  return (
    <WorkflowContext.Provider value={initialValue}>
      {children}
    </WorkflowContext.Provider>
  );
};

// Custom hook to use the context
export const useWorkflowContext = (): IWorkflowContext => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error(
      "useWorkflowContext must be used within a WorkflowProvider"
    );
  }
  return context;
};
