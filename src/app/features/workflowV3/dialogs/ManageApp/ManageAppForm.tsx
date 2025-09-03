import DataObjectIcon from "@mui/icons-material/DataObject";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import {
  CSSObject,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import DynamicSpecForm from "../../appGenerator/DynamicSpecForm";
import { ISpecFormValues } from "../../appGenerator/DynamicSpecForm.types";
import { IFormOptions } from "../../form/form.types";
import FormParser from "../../form/FormParser";
import { INodeCategory, INodeSubCategory } from "../../model/NodeData";
import BorderedBox from "../../rightPanel/BorderBox";
import JsonEditor from "../../rightPanel/JsonEditor";
import Dragger from "../../utils/Dagger";

interface IManageAppForm {
  selectedCategory: INodeCategory;
  nodeCategoryOptions: IFormOptions[];
  formSpec: INodeSubCategory;
  methods: UseFormReturn<ISpecFormValues>;
}

interface IStyles {
  [key: string]: React.CSSProperties | CSSObject;
}

const styles = (sidebarCollapse: boolean): IStyles => ({
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
    alignItems: "center",
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
    paddingTop: 1,
  },
  leftContainer: {
    flex: sidebarCollapse ? "1" : "0.50",
    display: "flex",
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    paddingRight: "10px",
  },
  rightContainer: {
    flex: sidebarCollapse ? "0.0" : "0.50",
    visibility: sidebarCollapse ? "hidden" : "visible",
    display: sidebarCollapse ? "none" : "block",
    transition: "ease-in-out",
    transitionDuration: "300ms",
    gap: 3,
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
});

const ManageAppForm = ({
  selectedCategory,
  nodeCategoryOptions,
  formSpec,
  methods,
}: IManageAppForm) => {
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);
  const [viewType, setViewType] = useState<string>("json");

  const defaultStyle = useMemo(
    () => styles(sidebarCollapse),
    [sidebarCollapse]
  );

  const { watch } = methods;

  const formValue = watch();

  return (
    <Stack direction="row" sx={defaultStyle.rootContainer}>
      <Stack sx={defaultStyle.leftContainer}>
        <DynamicSpecForm
          nodeCategories={nodeCategoryOptions}
          selectedCategory={selectedCategory}
          formSpec={formSpec}
          onGenerateSpec={() => {}}
        />
      </Stack>
      <Dragger
        sessionContextSidebarCollapse={sidebarCollapse}
        setSessionContextSidebarCollapse={setSidebarCollapse}
      />
      <Stack sx={defaultStyle.rightContainer}>
        <Stack>
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={(_, newValue) => {
              if (newValue) {
                setViewType(newValue);
              }
            }}
            sx={defaultStyle.viewSwitcher}
          >
            <ToggleButton value="form" sx={defaultStyle.toggleButton}>
              <FormatAlignCenterIcon sx={defaultStyle.toggleIcon} />
              Form
            </ToggleButton>

            <ToggleButton value="json" sx={defaultStyle.toggleButton}>
              <DataObjectIcon sx={defaultStyle.toggleIcon} />
              Json
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {viewType === "json" && (
          <JsonEditor
            label="Form spec"
            height="500px"
            defaultJson={formValue ?? {}}
            isReadOnly={true}
          />
        )}
        {viewType === "form" && formValue != null && (
          <BorderedBox title="Form controls">
            <FormProvider {...methods}>
              <FormParser formData={formValue?.form ?? []} fieldName={"test"} />
            </FormProvider>
          </BorderedBox>
        )}
      </Stack>
    </Stack>
  );
};

export default ManageAppForm;
