import React, { useState } from "react";

import WorkflowCanvas from "./WorkflowCanvas";

import { Edge, Node } from "reactflow";
import "./WorkflowCanvasContainer.css";
import { nodeCategories, nodeSubCategories } from "./mock/Templates";
import { mockExecutionWorkflow } from "./mock/mockExecutionWorkflow";
import { ITriggerData } from "./model/NodeData";
import { IWorkflowTask } from "./model/workflowTask";
// const styles = {
//   saveButton: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//   },

//   workflowContainerBox: {
//     position: "relative",
//     width: "100%",
//     height: "100%",
//   },

//   workflowCanvasBox: {
//     marginTop: "50px",
//     padding: "10px",
//     height: "calc(100% - 70px)",
//   },
// };

const WorkflowCanvasContainer: React.FC = () => {
  const [assetTypeForCanvas] = useState([]);
  const [assetSubTypeForCanvas] = useState([]);
  // sessionStorage.setItem("solutions", JSON.stringify(solutionId));
  // const userInfo = sessionStorage.getItem("userInfo");
  // const { token } = JSON.parse(userInfo);
  // const solution = useSolutionDetails();

  // const assetTypeRequestData = {
  //   applicationKey: solution.applicationKey,
  //   companyId: solution.companyId,
  //   solutionKey: solution.solutionKey,
  // };
  // const fetchAllRequestData = {
  //   applicationKey: "dxpplatform_irm-1707228132071",
  //   companyId: 0,
  //   solutionKey: "dxpplatform_irm1715799013086",
  //   assetCategory: "WORKFLOW",
  // };

  // const axiosPostTemplate = {
  //   method: "POST",
  //   headers: {
  //     accept: "*/*",
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // const [{ data: assetTypeData }] = useAxios({
  //   ...axiosPostTemplate,
  //   url: GET_ALL_ASSET_TYPE,
  //   data: assetTypeRequestData,
  // });

  // const [{ data: assetSubTypeData }] = useAxios({
  //   ...axiosPostTemplate,
  //   url: GET_ALL_ASSET_SUB_TYPE,
  //   data: assetTypeRequestData,
  // });

  // const [
  //   {
  //     data: allFetchedData,
  //     loading: isFetchAllLoading,
  //     error: isFetchAllError,
  //   },
  //   getAll,
  // ] = useAxios({
  //   ...axiosPostTemplate,
  //   url: GET_ALL_WORKFLOW_ASSET,
  //   data: fetchAllRequestData,
  // });

  // const [{}, saveWorkflow] = useAxios(
  //   {
  //     ...axiosPostTemplate,
  //     url: UPDATE_UI_WORKFLOW_ASSET,
  //   },
  //   { manual: true }
  // );

  const handleSave = (data) => {
    console.log(data);
    // saveWorkflow({ data: data });
  };

  const handleWorkflowDataChange = (
    nodes: Node<any, string>[],
    edges: Edge<any>[],
    tasks: IWorkflowTask[],
    tasksRefCounter: number,
    trigger: ITriggerData
  ) => {
    let data = {
      _id: "67d8272213eedaa047247efa",
      applicationKey: "demo-1707302165593",
      assetKey: "v3workflow-1742219042506",
      assetName: "V3Workflow",
      assetDescription: "Do not use it ",
      assetCategory: "WORKFLOW",
      assetOwner: "APPLICATION",
      assetConfig: {
        nodes: nodes,
        edges: edges,
        dxpWorkFlow: {
          name: "V3Workflow",
          description: "Do not use it ",
          refCounter: tasksRefCounter,
          version: 1,
          enableWorkflowProcessorWait: true,
          failureWorkflow: "FAILURE_WORKFLOW",
          assetType: trigger?.assetType,
          assetSubTypes: trigger?.assetSubType,
          referenceMetadata: [],
          assetStatuses: [],
          triggerEvent: trigger?.triggerEvent,
          triggerType: trigger?.triggerType,
          inputParameters: [],
        },
        workflowSpec: {
          name: "EmbProcessor",
          description: "EmbProcessor",
          version: 3,
          tasks: tasks,
          inputParameters: [],
          schemaVersion: 2,
          restartable: false,
          workflowStatusListenerEnabled: false,
          ownerEmail: "test@irm.com",
          timeoutPolicy: "TIME_OUT_WF",
          timeoutSeconds: 0,
          failureWorkflow: "FAILURE_WORKFLOW",
          createTime: 1741874955142,
          createdBy: "",
          ownerApp: "",
          updateTime: 0,
          updatedBy: "",
          refCounter: 16,
          enableWorkflowProcessorWait: true,
          triggerEvent: trigger?.triggerEvent,
          triggerType: trigger?.triggerType,
          assetType: trigger?.assetType,
          assetSubTypes: trigger?.assetSubType,
          referenceMetadata: [],
          assetStatuses: [],
        },
      },
      version: 1,
      createdBy: "shashank.shivhare@ironmountain.com",
      modifiedBy: "shashank.shivhare@ironmountain.com",
      assetImage: "",
      isDeleted: false,
      parentAssetKey: "",
      solutionKey: "preview-demo1738856620948",
      companyId: 8500,
      catalogKey: "",
    };
    // setWorkflowData(data);
    handleSave(data);
    // saveWorkflow({ data: data });
  };

  // useEffect(() => {
  //   if (assetTypeData) {
  //     let data = assetTypeData.map((asset) => {
  //       return {
  //         id: asset._id,
  //         value: asset.label,
  //         label: asset.label,
  //       };
  //     });
  //     setAssetTypeForCanvas(data);
  //   }
  // }, [assetTypeData]);

  // useEffect(() => {
  //   if (assetSubTypeData) {
  //     let data = assetSubTypeData.map((SubType: any) => {
  //       return {
  //         id: SubType._id,
  //         value: SubType.name,
  //         label: SubType.label,
  //         assetType: SubType.assetType,
  //       };
  //     });
  //     setAssetSubTypeForCanvas(data);
  //   }
  // }, [assetSubTypeData]);

  

  return (
    <WorkflowCanvas
      assetTypes={assetTypeForCanvas}
      assetSubTypes={assetSubTypeForCanvas}
      workflowDataChangeHandle={handleWorkflowDataChange}
      nodeCategory={nodeCategories}
      nodeSubCategory={nodeSubCategories}
      companyId={1000}
      isReadOnly={false}
      executionWorkflow={mockExecutionWorkflow}
    />
  );
};

export default WorkflowCanvasContainer;
