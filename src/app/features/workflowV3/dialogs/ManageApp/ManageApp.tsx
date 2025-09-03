import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import {
  Box,
  Button,
  CSSObject,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import { ISpecFormValues } from "../../appGenerator/DynamicSpecForm.types";

import { IFormOptions } from "../../form/form.types";
import { INodeCategory, INodeSubCategory } from "../../model/NodeData";

import NodeIcon from "../../utils/NodeIcon";

import ManageAppForm from "./ManageAppForm";

enum ViewType {
  VIEW_ALL,
  VIEW_SELECTED,
  CREATE,
}

interface IManageApp {
  categoryType: string;
  nodeSubCategory: INodeSubCategory[];
  nodeCategories: INodeCategory[];
  onCancel: () => void;
  onDeleteSubCat: (subCat: INodeSubCategory) => void;
  onUpdateSubCat: (subCat: INodeSubCategory) => void;
  onCreateSubCat: (subCat: INodeSubCategory) => void;
  isLoading: boolean;
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
  rootContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  viewSwitcher: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    width: "fit-content",
  },
  toggleButton: {
    textTransform: "none",
    border: "none",
    "&.Mui-selected": { backgroundColor: "#E3F2FD" },
  },
  toggleIcon: { fontSize: 16, marginRight: 0.5 },
  categoryTitle: {
    fontWeight: 400,
    textTransform: "capitalize",
  },
  formContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  actionsContainer: {
    justifyContent: "flex-start",
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "10px",
  },
  subCatContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
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
  iconButton: {
    bgcolor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    width: 40,
    height: 40,
  },
  commonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
});

interface ISettingFormDetails {
  formSpec: INodeSubCategory;
  view: ViewType;
  nodeOwner: "platform" | "solution";
}

const ManageApp = ({
  categoryType,

  nodeCategories,
  onCancel,
  onDeleteSubCat,
}: IManageApp) => {
  const [settingsForm, setSettingsForm] = useState<ISettingFormDetails>({
    formSpec: undefined,
    view: ViewType.VIEW_ALL,
    nodeOwner: "solution",
  });

  const defaultStyle = useMemo(() => styles(), []);

  const selectedCategory = useMemo(
    () => nodeCategories?.find((el) => el.type === categoryType),
    [categoryType, nodeCategories]
  );
  const nodeCategoryOptions = useMemo((): IFormOptions[] => {
    return nodeCategories?.map((el) => {
      return {
        value: el.type,
        label: el.nodeCategoryName,
      };
    });
  }, [nodeCategories]);

  const methods = useForm<ISpecFormValues>({
    // Add this to ensure values are available immediately
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ISpecFormValues) => {
    onSaveAndUpdate(data);
  };

  const onSaveAndUpdate = (spec: ISpecFormValues) => {
    console.log(spec);
  };
  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      onDeleteSubCat(settingsForm?.formSpec);
      setSettingsForm({
        formSpec: undefined,
        view: ViewType.VIEW_ALL,
        nodeOwner: "solution",
      });
    },
    [onDeleteSubCat, setSettingsForm, settingsForm]
  );

  const isExisting =
    settingsForm?.formSpec?._id && settingsForm?.formSpec?._id?.length > 0;

  return (
    <Dialog
      sx={defaultStyle.rootDialog}
      maxWidth={"sm"}
      open={categoryType != null}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle sx={defaultStyle.dialogTitle}>
        <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 1 }}>
          {settingsForm?.view === ViewType.VIEW_SELECTED && (
            <IconButton
              size="medium"
              style={{ padding: 2 }}
              onClick={() => {
                setSettingsForm({
                  formSpec: null,
                  view: ViewType.VIEW_ALL,
                  nodeOwner: "solution",
                });
              }}
            >
              <ArrowCircleLeftOutlinedIcon fontSize="small" />
            </IconButton>
          )}
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {selectedCategory && (
              <NodeIcon
                iconName={selectedCategory.nodeCategoryIcon}
                iconColor={selectedCategory.nodeCategoryColor}
                iconSize={18}
              />
            )}

            <Typography
              color={"primary.main"}
              sx={defaultStyle.categoryTitle}
              noWrap
            >
              {`${selectedCategory?.nodeCategoryName ?? ""}`}
            </Typography>
          </Stack>
        </Stack>

        {settingsForm?.view === ViewType.VIEW_SELECTED &&
          settingsForm?.formSpec?.nodeLabel && (
            <Stack sx={defaultStyle.commonRow}>
              <NodeIcon
                iconName={settingsForm?.formSpec.nodeIcon}
                iconColor={settingsForm?.formSpec.nodeIconColor}
              />
              <Typography>{settingsForm?.formSpec?.nodeLabel}</Typography>
            </Stack>
          )}
      </DialogTitle>
      <DialogContent sx={defaultStyle.dialogContent}>
        {settingsForm?.view === ViewType.VIEW_SELECTED && (
          <Box sx={defaultStyle.formContainer}>
            <ManageAppForm
              selectedCategory={selectedCategory}
              nodeCategoryOptions={nodeCategoryOptions}
              formSpec={settingsForm?.formSpec}
              methods={methods}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={defaultStyle.actionsContainer}>
        <Button
          disabled={false}
          variant="contained"
          size="small"
          sx={defaultStyle.cancelButton}
          onClick={onCancel}
        >
          {`Close`}
        </Button>
        {settingsForm?.view === ViewType.VIEW_SELECTED && (
          <Button
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#1E417A",
            }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleSubmit(onSubmit)()}
          >
            {isExisting ? "Update" : "Save"}
          </Button>
        )}
        {settingsForm?.view === ViewType.VIEW_SELECTED && isExisting && (
          <Button
            sx={{
              textTransform: "capitalize",
            }}
            variant="contained"
            size="small"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ManageApp;
