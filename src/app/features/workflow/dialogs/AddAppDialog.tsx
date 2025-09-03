import React, { useMemo, useState } from "react";
import {
  Button,
  CSSObject,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Dragger from "../utils/Dagger";

interface IAddAppDialogProps {
  showDialogue: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

interface IStyles {
  [key: string]: React.CSSProperties | CSSObject;
}

const styles = (sidebarCollapse: boolean, sidebarWidth: number): IStyles => ({
  rootDialog: {
    "& .MuiDialog-paper": {
      minWidth: "80%",
      maxHeight: "80%",
      height: "80%",
      width: "80%",
    },
    backgroundColor: "transparent",
  },
  dialogTitle: {
    fontFamily: "Inter",
    textAlign: "left",
    color: "#1E417A",
  },
  dialogContent: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rootContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  leftContainer: {
    flex: sidebarCollapse ? "0.0" : "0.50",
    width: sidebarCollapse ? "0px" : `${sidebarWidth}px`,
    visibility: sidebarCollapse ? "hidden" : "visible",
    display: sidebarCollapse ? "none" : "block",
    transition: "ease-in-out",
    transitionDuration: "300ms",
    overflow: "hidden",
  },
  rightContainer: {
    flex: sidebarCollapse ? "1" : "0.50",
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

const AddAppDialog = ({
  showDialogue,
  onCancel,
  onSubmit,
}: IAddAppDialogProps) => {
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(200);

  const defaultStyle = useMemo(
    () => styles(sidebarCollapse, sidebarWidth),
    [sidebarCollapse, sidebarWidth]
  );

  return (
    <Dialog
      sx={defaultStyle.rootDialog}
      maxWidth={"sm"}
      open={showDialogue}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle sx={defaultStyle.dialogTitle}>Add App</DialogTitle>
      <DialogContent sx={defaultStyle.dialogContent}>
        <Stack direction="row" sx={defaultStyle.rootContainer}>
          <Stack sx={defaultStyle.leftContainer}></Stack>
          <Dragger
            sessionContextSidebarCollapse={sidebarCollapse}
            setSessionContextSidebarCollapse={setSidebarCollapse}
            setSidebarWidth={setSidebarWidth}
          />
          <Stack sx={defaultStyle.rightContainer}></Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-start",
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          padding: "10px",
        }}
      >
        <Button
          disabled={false}
          variant="contained"
          size="small"
          sx={{
            textTransform: "capitalize",
            color: "#1E417A",
            backgroundColor: "#ffffff",
            borderColor: "#1E417A",
            border: `1px solid rgba(30, 65, 122, 0.50)`,
            boxShadow: "none",
            "&:hover": { color: "#ffffff !important" },
          }}
          onClick={() => {
            onCancel();
          }}
        >
          {`Cancel`}
        </Button>
        <Button
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#1E417A",
          }}
          variant="contained"
          size="small"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppDialog;
