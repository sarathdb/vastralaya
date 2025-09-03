import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useWorkflowContext } from "../../context/WorkflowContext";

import { Stack } from "@mui/system";
import { FormCheckbox } from "../../form/components/FormCheckbox";
import { FormSelectField } from "../../form/components/FormSelectField";
import { FormTextField } from "../../form/components/FormTextField";
import { ValidationRules } from "../../form/form.types";
import { useCreateWorkflowTask } from "../../hooks/useCreateWorkflowTask";
import { IBasePanel } from "../BasePanel";
import BorderedBox from "../BorderBox";
import JsonEditor from "../JsonEditor";
import { PanelContainer } from "../PanelContainer";

enum ProcessorType {
  job = "job",
  batch = "batch",
  api = "api",
}

const processorTypeOptions = [
  {
    label: "Job Processor",
    value: ProcessorType.job,
    description: "Executes an image",
  },
  {
    label: "Batch Processor",
    value: ProcessorType.batch,
    description: "Executes multiple request in a batch - image",
  },
  {
    label: "API Processor",
    value: ProcessorType.api,
    description: "Executes an api endpoint",
  },
];

interface IProcessorForm {
  processorType: string;
  image: string;
  isCallbackRequired: boolean;
  queueDepth: string;
  apiEndpoint: string;
  batchSize: string;
  // Small size configuration
  smallThreshold: string;
  smallCpu: string;
  smallMemory: string;
  // Medium size configuration
  mediumThreshold: string;
  mediumCpu: string;
  mediumMemory: string;
  // Large size configuration
  largeThreshold: string;
  largeCpu: string;
  largeMemory: string;
}

export const ProcessorPanel: React.FC<IBasePanel> = ({
  node,
  toggleOpen,
  companyId,
}) => {
  const { onUpdateTaskAndNode } = useWorkflowContext();
  const defaultForm = (node?.data?.formData as IProcessorForm) ?? {};
  const getWorkflowTask = useCreateWorkflowTask();
  // const getInputParameters = useInputParameterConstructor();
  const [jsonInput, setJsonInput] = useState<string>();

  const methods = useForm<IProcessorForm>({
    defaultValues: defaultForm,
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = (data: IProcessorForm) => {
    console.log("Form submitted:", data);
    // create task for processor
    const task = getWorkflowTask(
      node.id,
      node.data.conductorConfig.name,
      `${node.data.nodeName}-${node.id}`,
      node.data.conductorConfig.type
    );

    const fixedInputParameters = {
      data: "${workflow.variables}",
      ...(node.data.formData?.inputParameters ?? {}),
      processorName: node.data.nodeName,
      topic: `${companyId}_${node.data.nodeName}_${data.processorType}`,
      ...JSON.parse(jsonInput ?? `{}`),
    };
    // is callback is checked then create task for wait task

    if (data.isCallbackRequired) {
      onUpdateTaskAndNode(node, task, data, fixedInputParameters, true);
    } else {
      // if wait task is unchecked then remove the wait task
      onUpdateTaskAndNode(node, task, data, fixedInputParameters, false);
    }
  };

  const selectedProcessorType = processorTypeOptions.find(
    (e) => e.value === watch("processorType")
  );

  const resourceLimitRule: ValidationRules = useMemo(() => {
    return {
      required: "Limit is required",
      pattern: {
        value: /^[0-9]*$/,
        message: "Please enter numbers only",
      },
      validate: {
        notEmpty: (value) => value.trim() !== "" || "Limit cannot be empty",
      },
    };
  }, []);

  return (
    <PanelContainer
      label={node.data.nodeLabel}
      onSave={handleSubmit(onSubmit)}
      toggleOpen={toggleOpen}
      inputContent={defaultForm}
    >
      <FormProvider {...methods}>
        <FormSelectField
          name="processorType"
          label="Processor Type"
          options={processorTypeOptions}
          rules={{ required: "Please select the processor type" }}
        />

        {selectedProcessorType && (
          <BorderedBox title={selectedProcessorType.label}>
            <FormCheckbox
              name="isCallbackRequired"
              label="Task requires callback url to complete ?"
            />
            <FormTextField name="image" label="Docker Image URL" />
            <FormTextField name="queueDepth" label="Queue Depth" />

            {selectedProcessorType.value === ProcessorType.batch && (
              <FormTextField name="batchSize" label="Batch Size" />
            )}
            {selectedProcessorType.value === ProcessorType.api && (
              <FormTextField name="apiEndpoint" label="ApiEndpoint" />
            )}
            <BorderedBox
              title="Resource Limit"
              subTitle="Define your resource limit which will determined on basis of asset size"
            >
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <BorderedBox title="Small">
                  <FormTextField
                    name="smallThreshold"
                    label="Threshold"
                    rules={resourceLimitRule}
                  />
                  <FormTextField
                    name="smallCpu"
                    label="CPU"
                    rules={resourceLimitRule}
                  />
                  <FormTextField
                    name="smallMemory"
                    label="Memory"
                    rules={resourceLimitRule}
                  />
                </BorderedBox>
                <BorderedBox title="Medium">
                  <FormTextField
                    name="mediumThreshold"
                    label="Threshold"
                    rules={resourceLimitRule}
                  />
                  <FormTextField
                    name="mediumCpu"
                    label="CPU"
                    rules={resourceLimitRule}
                  />
                  <FormTextField
                    name="mediumMemory"
                    label="Memory"
                    rules={resourceLimitRule}
                  />
                </BorderedBox>
                <BorderedBox title="Large">
                  <FormTextField
                    name="largeThreshold"
                    label="Threshold"
                    rules={resourceLimitRule}
                  />
                  <FormTextField
                    name="largeCpu"
                    label="CPU"
                    rules={resourceLimitRule}
                  />
                  <FormTextField
                    name="largeMemory"
                    label="Memory"
                    rules={resourceLimitRule}
                  />
                </BorderedBox>
              </Stack>
            </BorderedBox>
          </BorderedBox>
        )}
        <JsonEditor
          defaultJson={node?.data?.formData?.inputParameters ?? {}}
          variableSuggestions={[]}
          onSubmit={setJsonInput}
          label="Input parameters"
          height="400px"
        />
      </FormProvider>
    </PanelContainer>
  );
};
