import { Box, CSSObject, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useWorkflowContext } from "../../context/WorkflowContext";
import { FormMultiSelectField } from "../../form/components/FormMultiSelectField";
import { FormSelectField } from "../../form/components/FormSelectField";
import { setAssetDetailsTask } from "../../presets/tasks/setAssetDetail";
import { startNode } from "../../presets/tasks/startNode";

import { eventOptions } from "../../mock/Templates";
import { workflowStatusUpdate } from "../../presets/tasks/workflowStatusUpdate";
import BorderedBox from "../BorderBox";
import { PanelContainer } from "../PanelContainer";

import { IBasePanel } from "../BasePanel";
import { FormTextField } from "../../form/components/FormTextField";
import { ValidationRules } from "../../form/form.types";

const styles = (
  selectedAssetType: string
): { [key: string]: React.CSSProperties | CSSObject } => ({
  assetSubTypeContainer: {
    pointerEvents: selectedAssetType ? "unset" : "none",
    opacity: selectedAssetType ? "unset" : 0.5,
  },
});

const scheduleTypeOptions = [
  {
    id: 1,
    value: "Fixed Delay",
    label: "Fixed Delay",
  },
];

export const triggerEventOptions = [
  {
    label: "Asset Created",
    value: "Asset_Created",
  },
  {
    label: "Asset Updated",
    value: "Asset_Updated",
  },
  {
    label: "Asset Deleted",
    value: "Asset_Deleted",
  },
  {
    label: "Manual",
    value: "Manual",
  },
  {
    label: "Metadata Updated",
    value: "Metadata_Updated",
  },
];

export interface ITriggerForm {
  triggerType: string;
  assetType: string;
  assetSubType: string[];
  triggerEvent: string;
  scheduleType?: string;
  fixedDelay?: string;
}

export const TriggerPanel: React.FC<IBasePanel> = ({
  node,
  toggleOpen,
  assetTypes,
  assetSubTypes,
}) => {
  const { onUpdateTask, onUpdateFormDataForNode } = useWorkflowContext();
  const defaultForm = node?.data?.formData;

  const methods = useForm<ITriggerForm>({
    defaultValues: defaultForm,
  });

  const fixedDelayLimitRule: ValidationRules = useMemo(() => {
    return {
      required: "Fixed delay is required",
      pattern: {
        value: /^[0-9]*$/,
        message: "Please enter numbers only",
      },
      validate: {
        notEmpty: (value) =>
          value.trim() !== "" || "Fixed delay cannot be empty",
      },
    };
  }, []);

  const { handleSubmit, watch } = methods;
  const triggerType = watch("triggerType");
  const selectedAssetType = watch("assetType");
  const scheduleType = watch("scheduleType");

  const defaultStyles = useMemo(
    () => styles(selectedAssetType),
    [selectedAssetType]
  );

  const filteredAssetSubTypes = assetSubTypes.filter(
    (subtype) => subtype.assetType === selectedAssetType
  );

  const onSubmit = (data: ITriggerForm) => {
    onUpdateTask(node.id, startNode);
    onUpdateTask(node.id, setAssetDetailsTask);
    onUpdateTask(node.id, workflowStatusUpdate);
    onUpdateFormDataForNode(node, data);
  };

  return (
    <PanelContainer
      label={node.data.nodeLabel}
      onSave={handleSubmit(onSubmit)}
      toggleOpen={toggleOpen}
      inputContent={node?.data?.formData ?? {}}
    >
      <FormProvider {...methods}>
        <Box>
          <FormSelectField
            name="triggerType"
            label="Trigger Type"
            options={eventOptions}
            rules={{ required: "Please select the trigger type" }}
          />
        </Box>
        {triggerType === "Event" && (
          <Stack sx={{ gap: 1 }}>
            <BorderedBox title="Event">
              <Stack sx={{ gap: 2 }}>
                <Box>
                  <FormSelectField
                    name="assetType"
                    label="Asset Type"
                    options={assetTypes}
                    rules={{ required: "Please select the asset type" }}
                  />
                </Box>
                <Box sx={defaultStyles.assetSubTypeContainer}>
                  <FormMultiSelectField
                    name="assetSubType"
                    label="Asset Subtype"
                    options={filteredAssetSubTypes}
                    rules={{ required: "Please select the asset subtype" }}
                  />
                </Box>
                <Box>
                  <FormSelectField
                    name="triggerEvent"
                    label="Trigger Event"
                    options={triggerEventOptions}
                    rules={{ required: "Please select the trigger event" }}
                  />
                </Box>
              </Stack>
            </BorderedBox>
          </Stack>
        )}

        {triggerType === "schedule" && (
          <Stack sx={{ gap: 1 }}>
            <BorderedBox title="Schedule">
              <Stack sx={{ gap: 2 }}>
                <Box>
                  <FormSelectField
                    name="scheduleType"
                    label="Schedule Type"
                    options={scheduleTypeOptions}
                    rules={{ required: "Please select the schedule type" }}
                  />
                </Box>
                {scheduleType && (
                  <Box>
                    <FormTextField
                      name="fixedDelay"
                      label="Fixed Delay in Minutes"
                      rules={fixedDelayLimitRule}
                    />
                  </Box>
                )}
              </Stack>
            </BorderedBox>
          </Stack>
        )}
      </FormProvider>
    </PanelContainer>
  );
};
