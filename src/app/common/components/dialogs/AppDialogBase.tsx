import {
  Button,
  CSSObject,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import LoadingOverlay from "../utils/LoadingOverlay";

interface IAppDialogBase {
  isOpen: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onUpdate?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSave?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSaveEnabled?: boolean;
  isUpdateEnabled?: boolean;
  isDeleteEnabled?: boolean;
  titleComponent: React.ReactNode;
  contentComponent: React.ReactNode;
  isLoading: boolean;
  height?: string;
  width?: string;
  errorMessage?: string;
  showAsDialog?: boolean;
}

interface IStyles {
  [key: string]: React.CSSProperties | CSSObject;
}

const styles = (height: string, width: string): IStyles => ({
  rootDialog: {
    "& .MuiDialog-paper": {
      minWidth: width ?? "80%",
      maxHeight: height ?? "80%",
      height: "80%",
      width: "80%",
    },
    backgroundColor: "transparent",
  },
  paperContainer: {
    height: "100%",
    width: "100%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "#fff",
  },
  dialogTitle: {
    fontFamily: "Inter",
    textAlign: "left",
    color: "#1E417A",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottom: 0.5,
    borderColor: "grey",
    flexDirection: "row",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 2,
    gap: 1,
    boxSizing: "border-box",
  },
  actionsContainer: {
    justifyContent: "flex-start",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "10px",
  },
  cancelButton: {
    textTransform: "capitalize",
    color: "#1E417A",
    backgroundColor: "#ffffff",
    borderColor: "#1E417A",
    border: `1px solid rgba(30, 65, 122, 0.50)`,
    boxShadow: "none",
    "&:hover": { color: "#ffffff !important" },
  },
  errorMessage: {
    color: "red",
    fontSize: "small",
  },
});

export const AppDialogBase = ({
  isOpen,
  isSaveEnabled,
  isDeleteEnabled,
  isUpdateEnabled,
  onUpdate,
  onDelete,
  onSave,
  onCancel,
  contentComponent,
  titleComponent,
  isLoading,
  errorMessage,
  height,
  width,
  showAsDialog = true,
}: IAppDialogBase) => {
  const defaultStyle = useMemo(() => styles(height, width), [height, width]);

  if (!isOpen) return null;

  const content = (
    <>
      <LoadingOverlay loading={isLoading} />
      <DialogTitle sx={defaultStyle.dialogTitle} component="div">
        {titleComponent}
      </DialogTitle>
      <DialogContent sx={defaultStyle.dialogContent}>
        {contentComponent}
      </DialogContent>
      <DialogActions sx={defaultStyle.actionsContainer}>
        {showAsDialog && (
          <Button
            variant="contained"
            size="small"
            sx={defaultStyle.cancelButton}
            onClick={onCancel}
          >
            Close
          </Button>
        )}
        {isSaveEnabled && (
          <Button
            sx={{ textTransform: "capitalize", backgroundColor: "#1E417A" }}
            variant="contained"
            size="small"
            color="primary"
            onClick={onSave}
          >
            Save
          </Button>
        )}
        {isUpdateEnabled && (
          <Button
            sx={{ textTransform: "capitalize", backgroundColor: "#1E417A" }}
            variant="contained"
            size="small"
            color="primary"
            onClick={onUpdate}
          >
            Update
          </Button>
        )}
        {isDeleteEnabled && (
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            size="small"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
        {errorMessage && (
          <Typography sx={defaultStyle.errorMessage}>{errorMessage}</Typography>
        )}
      </DialogActions>
    </>
  );

  return showAsDialog ? (
    <Dialog
      sx={defaultStyle.rootDialog}
      maxWidth="sm"
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
    >
      {content}
    </Dialog>
  ) : (
    <Stack sx={defaultStyle.paperContainer}>{content}</Stack>
  );
};
