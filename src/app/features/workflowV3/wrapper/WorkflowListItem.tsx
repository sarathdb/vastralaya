import React, { useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";

import { Card, IconButton, Tooltip, Typography } from "@mui/material";

// import workFlowStore from "./workFlowStore";
// import commonStore, { CommonStore } from "../../home/commonStore";
import DeleteIcon from "@mui/icons-material/Delete";
// import useTranslation from "../../loaders/useTranslation";
// import locales from "../../../locale_designer.json";
import { IWorkflow } from "../model/Workflow";

interface WorkflowItemProps {
  workflow: IWorkflow;
  onClick: (workflow: IWorkflow) => void;
  onDelete?: (workflow: IWorkflow) => void;
}

const styles = {
  workflowCard: {
    display: "flex",
    flex: 1,
    height: 280,
    width: "413px",
    border: "1px solid #BDBDBD",
    background: "linear-gradient(0deg, #FFFDFF, #FFFDFF)",
    borderRadius: "10px",
    boxShadow: "none",
    boxSizing: "border-box",
    position: "relative",
    flexDirection: "column",
  },
  descBox: {
    display: "flex",
    flexDirection: "column",
    flex: "50%", // Changed to 50%
    overflow: "hidden",
    padding: 2,
    boxSizing: "border-box",
    borderBottom: "1px solid #c9c4c4",
  },
  workflowName: {
    font: "Inter",
    marginBottom: "4px",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "25px",
    letterSpacing: "0.15",
    textAlign: "left",
    fontFamily: "Inter",
    textTransform: "capitalize",
    color: "#1A3B72",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    whiteSpace: "nowrap",
  },
  workflowStatusWrapper: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    height: "25px",
  },
  workflowStatus: {
    fontFamily: "Inter",
    fontSize: "13px",
    fontWeight: "400",
    color: "#1e417a",
    textTransform: "capitalize",
    padding: "10px",
    textAlign: "left",
  },
  workflowDesc: {
    flexWrap: "nowrap",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.10",
    textAlign: "left",
    paddingTop: "8px",
    flex: 1,
    color: "#00000099",
  },
  imageBox: {
    height: "50%",
    width: "100%",
    display: "flex",
    backgroundColor: "#F1F5F7",
    position: "relative",
  },
  imgTag: {
    maxHeight: "100%",
    minHeight: "100%",
    maxWidth: "100%",
    width: "100%",
    objectFit: "contain" as "contain",
  },
  deleteButton: {
    position: "absolute" as "absolute",
    right: "8px",
    top: "8px",
    zIndex: 1,
  },
  bulletMark: {
    height: "9px",
    width: "9px",
    backgroundColor: "#1e417a",
    borderRadius: "9px",
  },
};

const WorkflowListItem = ({
  workflow,
  onClick,
  onDelete,
}: WorkflowItemProps) => {
  const [workflowImage, setWorkflowImage] = useState<string>(
    workflow.assetImage
  );
  // const [currentLanguage, setCurrentLanguage] = React.useState<any>(
  //   commonStore.getLanguage()
  // );
  // let localeContent = locales;
  // const translation = useTranslation(localeContent);
  // translation.setLanguage(currentLanguage);

  // React.useEffect(() => {
  //   const subscription = commonStore
  //     .getState()
  //     .subscribe((state: CommonStore) => {
  //       const { language } = state;
  //       setCurrentLanguage(language);
  //     });
  //   return () => subscription.unsubscribe();
  // }, []);

  useLayoutEffect(() => {
    setWorkflowImage(workflow.assetImage);
  }, [workflow]);

  return (
    <Card
      key={workflow.assetKey}
      sx={styles.workflowCard}
      onClick={() => {
        onClick(workflow);
      }}
    >
      <Box sx={styles.descBox}>
        <Tooltip title={workflow.assetName} placement="top">
          <Typography sx={styles.workflowName}>{workflow.assetName}</Typography>
        </Tooltip>

        <div style={styles.workflowStatusWrapper}>
          <div style={styles.bulletMark}></div>

          <Typography display="inline" noWrap sx={styles.workflowStatus}>
            Ready
          </Typography>
        </div>
        <Typography variant="subtitle2" sx={styles.workflowDesc}>
          {`${workflow.assetDescription}`}
        </Typography>
      </Box>
      <Box sx={styles.imageBox}>
        <img
          src={`data:image/png;base64,${workflowImage}`}
          style={styles.imgTag}
          alt={""}
        />
      </Box>
      <div style={styles.deleteButton}>
        <IconButton
          sx={{}}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(workflow);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default React.memo(WorkflowListItem);
