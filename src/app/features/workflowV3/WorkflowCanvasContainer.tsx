import React, { useState } from "react";

import WorkflowCanvas from "./WorkflowCanvas";
import NotificationBoundary from "./notificationBoundry/NotificationBoundary";

import { IWorkflow } from "./model/Workflow";

// import { nodeCategories, nodeSubCategories } from "./mock/Templates";

import { nodeCategories, nodeSubCategories } from "./mock/mockNodeCategories";

interface IWorkflowCanvasContainer {
  requestPayload?: any;
}

const WorkflowCanvasContainerBase: React.FC<IWorkflowCanvasContainer> = () => {
  const [workflow] = useState<IWorkflow>();
  const [assetTypeForCanvas] = useState([]);
  const [assetSubTypeForCanvas] = useState([]);

  const getCanvasData = () => {
    if (workflow) {
      const { assetConfig } = workflow;
      const { nodes = [], edges = [], workflowSpec } = assetConfig;
      const { refCounter = 0, tasks = [] } = workflowSpec;
      return { nodes, edges, refCounter, tasks };
    }
    return { nodes: [], edges: [], refCounter: 0, tasks: [] };
  };

  const { nodes, edges, refCounter, tasks } = getCanvasData();

  /** API block ends  */

  // Combine all loading states into a single isLoading variable

  return (
    <WorkflowCanvas
      assetTypes={assetTypeForCanvas}
      assetSubTypes={assetSubTypeForCanvas}
      workflowDataChangeHandle={() => {}}
      nodeCategory={nodeCategories}
      nodeSubCategory={nodeSubCategories}
      companyId={null}
      solutionKey={null}
      applicationKey={null}
      isReadOnly={false}
      workflowType={null}
      executionWorkflow={null}
      executionList={[]}
      workflowTypeChangeHandler={() => {}}
      executionSelectionHandler={() => {}}
      refreshCurrentExecution={() => {}}
      refreshExecutions={() => {}}
      selectedExecution={null}
      canvasNodes={nodes}
      canvasEdges={edges}
      workflowTasks={tasks}
      counterRef={refCounter}
      onDeleteSubCat={() => {}}
      onCreateSubCat={() => {}}
      onUpdateSubCat={() => {}}
      isLoading={false}
    />
  );
};

export const WorkflowCanvasContainer: React.FC<IWorkflowCanvasContainer> = ({
  requestPayload,
}: IWorkflowCanvasContainer) => {
  return (
    <NotificationBoundary>
      <WorkflowCanvasContainerBase requestPayload={requestPayload} />
    </NotificationBoundary>
  );
};
