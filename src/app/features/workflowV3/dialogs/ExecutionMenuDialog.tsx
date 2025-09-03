import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,

  DialogActions,
  CSSObject,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { IExecutionMenuItem } from "../model/workflowTask";
import ClearIcon from "@mui/icons-material/HighlightOff";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ExecutionMenuDialogProps {
  open: boolean;
  onClose: () => void;
  executions: IExecutionMenuItem[];
  onSelectRow: (selectedRow: IExecutionMenuItem | null) => void;
  handleRefresh: () => void;
}

interface IStyles {
  [key: string]: React.CSSProperties | CSSObject;
}

const styles = (): IStyles => ({
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
    display: "flex",
    borderBottom: 0.5,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogContent: { display: "flex", flexDirection: "column", height: "70vh" },
  gridContainer: { flexGrow: 1, mt: 2, overflow: "hidden" },
  grid: {
    "& .MuiDataGrid-columnHeaders": {
      position: "sticky",
      top: 0,
      backgroundColor: "background.paper",
      zIndex: 1,
    },
    "& .MuiDataGrid-footerContainer": {
      position: "sticky",
      bottom: 0,
      backgroundColor: "background.paper",
      zIndex: 1,
    },
    "& .MuiDataGrid-cell:focus": {
      outline: " none",
    },
    height: "100%",
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
  refreshIconButton: {
    bgcolor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    width: 40,
    height: 40,
  },
});

const ExecutionMenuDialog: React.FC<ExecutionMenuDialogProps> = ({
  open,
  onClose,
  executions,
  onSelectRow,
  handleRefresh,
}) => {
  const defaultStyle = useMemo(() => styles(), []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const columns: GridColDef[] = [
    { field: "workflowType", headerName: "Workflow Name", flex: 1 },
    { field: "workflowId", headerName: "Workflow Instance ID", flex: 1.8 },
    { field: "startTime", headerName: "Start Time", flex: 1.2 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "version", headerName: "Version", flex: 0.5 },
  ];

  const filteredWorkflows = executions
    .filter((workflow) =>
      Object.values(workflow).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .map((item, index) => {
      return { id: index, ...item };
    });

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    const selectedId =
      selectionModel.length > 0 ? (selectionModel[0] as number) : null;
    setSelectedRowId(selectedId);

    const selectedItem = filteredWorkflows.find(
      (_, index) => index === selectedId
    );
    onSelectRow(selectedItem || null);
    if (selectedItem) onClose();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={defaultStyle.dialogTitle}>
        Execution Workflow List
        <Tooltip title="Refresh">
          <IconButton
            size="small"
            sx={defaultStyle.refreshIconButton}
            onClick={handleRefresh}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent sx={defaultStyle.dialogContent}>
        <Stack>
          <TextField
            sx={{ width: 300 }}
            label="Search"
            variant="standard"
            margin="dense"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            InputProps={{
              endAdornment: searchTerm && (
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Stack>
        <Stack sx={defaultStyle.gridContainer}>
          <DataGrid
            rows={filteredWorkflows}
            columns={columns}
            pageSizeOptions={[20, 50, 100]}
            pagination
            checkboxSelection={false}
            onRowSelectionModelChange={handleRowSelection}
            rowSelectionModel={selectedRowId !== null ? [selectedRowId] : []}
            sx={defaultStyle.grid}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={defaultStyle.actionsContainer}>
        <Button
          sx={defaultStyle.cancelButton}
          variant="contained"
          size="small"
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExecutionMenuDialog;
