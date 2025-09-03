import { Box, CSSObject, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useWorkflowContext } from "../../context/WorkflowContext";
import { FormMultiSelectField } from "../../form/components/FormMultiSelectField";
import { FormSelectField } from "../../form/components/FormSelectField";
import { getAssetDetailsTask } from "../../presets/tasks/setAssetDetailTask";
import { startNode } from "../../presets/tasks/startNode";

import { eventOptions } from "../../mock/Templates";
import { workflowStatusUpdate } from "../../presets/tasks/workflowStatusUpdate";
import BorderedBox from "../BorderBox";
import { PanelContainer } from "../PanelContainer";

import { FormTextField } from "../../form/components/FormTextField";
import { ValidationRules } from "../../form/form.types";
import { IBasePanel } from "../BasePanel";
import { CronScheduler } from "../cron/CronScheduler";

const styles = (
  selectedAssetType: string
): { [key: string]: React.CSSProperties | CSSObject } => ({
  assetSubTypeContainer: {
    pointerEvents: selectedAssetType ? "unset" : "none",
    opacity: selectedAssetType ? "unset" : 0.5,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 2,
    maxWidth: "100%",
  },
  cronItemContainer: { flex: 1 },
});

const scheduleTypeOptions = [
  {
    id: 1,
    value: "Fixed Delay",
    label: "Fixed Delay",
  },

  {
    id: 2,
    value: "Cron",
    label: "Cron",
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

// interface CronFormData {
//   minute: string;
//   hour: string;
//   day: string;
//   month: string;
//   weekday: string;
// }

// const defaultCronFormData: CronFormData = {
//   minute: "0",
//   hour: "0",
//   day: "0",
//   month: "0",
//   weekday: "0",
// };

// interface CronSchedulerProps {
//   defaultValues: CronFormData;
//   onCronChange: (data: CronFormData) => void;
// }

// const weekdays = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const cronItems = [
//   { name: "minute", label: "Minute", range: 60 },
//   { name: "hour", label: "Hour", range: 24 },
//   { name: "day", label: "Day", range: 31 },
//   { name: "month", label: "Month", range: 12 },
// ];

// const generateOptions = (range: number) =>
//   Array.from({ length: range }, (_, i) => i.toString());

export interface ITriggerForm {
  triggerType: string;
  assetType: string;
  assetSubType: string[];
  triggerEvent: string;
  scheduleType?: string;
  fixedDelay?: string;
  minute?: string;
  hour?: string;
  day?: string;
  month?: string;
  weekday?: string;
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

  // const { reset, control } = methods;

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

  // const minute = watch("minute") || defaultCronFormData.minute;
  // const hour = watch("hour") || defaultCronFormData.hour;
  // const day = watch("day") || defaultCronFormData.day;
  // const month = watch("month") || defaultCronFormData.month;
  // const weekday = watch("weekday") || defaultCronFormData.weekday;

  const defaultStyles = useMemo(
    () => styles(selectedAssetType),
    [selectedAssetType]
  );

  const filteredAssetSubTypes = assetSubTypes.filter(
    (subtype) => subtype.assetType === selectedAssetType
  );

  const onSubmit = (data: ITriggerForm) => {
    const startTaskName = onUpdateTask(
      node.id,
      startNode,
      startNode.inputParameters
    );
    const setAssetDetailsTask = getAssetDetailsTask(startTaskName);
    onUpdateTask(
      node.id,
      setAssetDetailsTask,
      setAssetDetailsTask.inputParameters
    );
    onUpdateTask(
      node.id,
      workflowStatusUpdate,
      workflowStatusUpdate.inputParameters
    );
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
                {scheduleType === "Fixed Delay" && (
                  <Box>
                    <FormTextField
                      name="fixedDelay"
                      label="Fixed Delay in Minutes"
                      rules={fixedDelayLimitRule}
                    />
                  </Box>
                )}
                {scheduleType === "Cron" && (
                  <Stack>
                    <CronScheduler />
                  </Stack>
                )}
              </Stack>
            </BorderedBox>
          </Stack>
        )}
      </FormProvider>
    </PanelContainer>
  );
};
