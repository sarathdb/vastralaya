import React, { useEffect, useState } from "react";

import {
  Box,
  ImageList,
  ImageListItem,
  Typography,
  IconButton,
  Grid,
  Button,
} from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
// import { AssetCategory, AssetsReq } from "../../api/types";

// import commonStore, { CommonStore } from "../../home/commonStore";
// import NoResults from "../../utils/NoResults";
// import useTranslation from "../../loaders/useTranslation";
// import locales from "../../../locale_designer.json";
import WorkflowListItem from "./WorkflowListItem";

// import {
//   CREATE_UI_WORKFLOW_ASSET,
//   DELETE_WORKFLOW,
//   GET_ALL_WORKFLOW_ASSET,
// } from "../../api/apiEndPoints";
import { WorkflowCanvasContainer } from "../WorkflowCanvasContainer";
import SearchField from "./SearchField";
import { IWorkflow } from "../model/Workflow";
import { workflowDebugList } from "../mock/debug_wf_list";
// import AppDialog from "../../dialogs/AppDialog";

const WorkflowList = () => {
  const [workflows] = useState<IWorkflow[]>(workflowDebugList);
  const [filteredAssets, setFilteredAssets] =
    useState<IWorkflow[]>(workflowDebugList);
  const [searchString, setSearchString] = useState("");
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<IWorkflow>(
    workflowDebugList[0]
  );

  // const userInfo = sessionStorage.getItem("userInfo");
  // const { token } = JSON.parse(userInfo);

  // const fetchWorkflows = () => {
  //   const data: AssetsReq = {
  //     applicationKey: solution.applicationKey,
  //     solutionKey: solution.solutionKey,
  //     companyId: solution.companyId,
  //     assetCategory: AssetCategory.WORKFLOW,
  //     includeAssetConfig: false,
  //     type: "v3",
  //   };
  //   workflowsOperation({
  //     data,
  //   });
  // };

  // useEffect(() => {
  //   fetchWorkflows();
  // }, []);

  // useEffect(() => {
  //   if (workflowsResponse) {
  //     setWorkflows(workflowsResponse);
  //     setFilteredAssets(workflowsResponse);
  //   }
  // }, [workflowsResponse]);

  // React.useEffect(() => {
  //   const subscription = commonStore
  //     .getState()
  //     .subscribe((state: CommonStore) => {
  //       const { language } = state;
  //       setCurrentLanguage(language);
  //     });
  //   return () => subscription.unsubscribe();
  // }, []);

  const handleSearch = (searchString: string) => {
    setSearchString(searchString);
  };

  useEffect(() => {
    if (searchString?.length > 0) {
      setFilteredAssets(
        workflows.filter((item: IWorkflow) =>
          item.assetName
            .toLocaleLowerCase()
            .includes(searchString.toLocaleLowerCase())
        )
      );
    } else {
      setFilteredAssets(workflows);
    }
  }, [searchString]);

  const onClick = (_: IWorkflow) => {
    setSelectedWorkflow(workflowDebugList[0]);
    setShowCanvas(true);
  };
  // const onDelete = (workflow: IWorkflow) => {
  //   setSelectedWorkflow(workflow);
  //   setShowDelete(true);
  // };
  // const onConfirmDelete = () => {
  //   onCancelDelete();
  //   const data = {
  //     applicationKey: solution.applicationKey,
  //     solutionKey: solution.solutionKey,
  //     companyId: solution.companyId,
  //     assetCategory: AssetCategory.WORKFLOW,
  //     assetName: selectedWorkflow.assetName,
  //   };
  //   deleteOperation({ data });
  // };
  // const onCancelDelete = () => {
  //   setShowDelete(false);
  // };

  // useEffect(() => {
  //   if (deleteResponse) {
  //     setSelectedWorkflow(null);
  //     fetchWorkflows();
  //   }
  // }, [deleteResponse]);

  // const onCreate = (workflow: IWorkflow) => {
  //   createOperation({ data: workflow });
  // };
  // useEffect(() => {
  //   if (createResponse) {
  //     fetchWorkflows();
  //     setShowCreate(false);
  //     snackBarStore.setInfo({
  //       open: true,
  //       message: `${translation.formatString(
  //         translation["label.ui.created_successfully"],
  //         createResponse.assetName
  //       )}`,
  //       severity: "success",
  //     });
  //     setSelectedWorkflow(createResponse);
  //     setShowCanvas(true);
  //   }
  // }, [createResponse]);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        flexDirection: "column",
        display: "flex",
        flex: 1,
        boxSizing: "border-box",
        border: 0,
        boxShadow: "none",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          marginBottom: 3,
          textIndent: 4,
          position: "sticky",
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {!showCanvas && (
                <Typography
                  variant="h4"
                  color={"primary.main"}
                  component="h4"
                  sx={{
                    display: "flex",
                    fontWeight: 400,
                    fontFamily: "Inter",
                    fontSize: "34px",
                    lineHeight: "42px",
                    letterSpacing: "0.25px",
                    textAlign: "left",
                    color: "#1E417A",
                    flex: 1,
                    alignSelf: "flex-start",
                  }}
                >
                  Workflows
                </Typography>
              )}
              {showCanvas && (
                <Box
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    boxSizing: "border-box",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color={"text.secondary"}
                    sx={{ fontWeight: 400, fontSize: "16px" }}
                  >
                    Workflows
                  </Typography>

                  <Box
                    sx={{
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    <IconButton
                      size="medium"
                      style={{ padding: 2 }}
                      onClick={() => {
                        setShowCanvas(false);
                      }}
                    >
                      <ArrowCircleLeftOutlinedIcon fontSize="medium" />
                    </IconButton>
                    <Typography
                      role="heading"
                      aria-label="header"
                      variant="h4"
                      color={"primary.main"}
                      component="h4"
                      sx={{ fontWeight: 400, textTransform: "capitalize" }}
                      noWrap
                    >
                      {`${selectedWorkflow?.assetName}`}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          {!showCanvas ? (
            <Grid
              item
              xs
              sx={{
                textAlignLast: "right",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              <Button
                sx={{ textTransform: "capitalize", fontSize: "14px" }}
                variant="contained"
                size="small"
                color="primary"
                // onClick={() => {
                //   setShowDialog(true);
                // }}
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                Workflows
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Box>

      {!showCanvas && (
        <div className="workflow-list-container">
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <SearchField
              placeholder={"Placeholder"}
              value={searchString}
              handleSearch={handleSearch}
            />

            {filteredAssets && filteredAssets.length > 0 && (
              <ImageList
                gap={12}
                sx={{
                  height: "100%",
                  width: "100%",
                  flex: 1,
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(420px, 1fr))!important",
                }}
                rowHeight={250}
              >
                {filteredAssets &&
                  filteredAssets.length > 0 &&
                  filteredAssets.map((workflow: IWorkflow) => (
                    <ImageListItem key={workflow.assetKey}>
                      <WorkflowListItem
                        workflow={workflow}
                        onClick={() => onClick(workflow)}
                        onDelete={() => {}}
                      />
                      ;
                    </ImageListItem>
                  ))}
              </ImageList>
            )}

            {workflows.length > 0 && filteredAssets.length === 0 && (
              <Typography
                sx={{
                  fontSize: 16,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                No workflows found
              </Typography>
            )}
          </Box>
        </div>
      )}
      {showCanvas && selectedWorkflow && (
        <WorkflowCanvasContainer
          requestPayload={{
            applicationKey: selectedWorkflow.applicationKey,
            solutionKey: selectedWorkflow.solutionKey,
            companyId: selectedWorkflow.companyId,
            assetKey: selectedWorkflow.assetKey,
          }}
        />
      )}
      {/* {showDelete && selectedWorkflow && (
        <DeleteWorkflowDialog
          open={showDelete}
          onCloseDelete={onCancelDelete}
          onConfirmDelete={onConfirmDelete}
          name={selectedWorkflow.assetName}
        />
      )} */}
      {/* {showCreate && (
        <CreateWorkflow
          showDialogue={showCreate}
          onCancelCreate={() => setShowCreate(false)}
          onCreate={onCreate}
        />
      )} */}

      {/* <AppDialog open={showDialog} onClose={() => setShowDialog(false)} /> */}
    </Box>
  );
};

export default React.memo(WorkflowList);
