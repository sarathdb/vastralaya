import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Stack } from "@mui/system";

import { useWorkflowContext } from "../../../context/WorkflowContext";
import { FormCheckbox } from "../../../form/components/FormCheckbox";
import { FormJsonEditor } from "../../../form/components/FormJsonEditor";
import { FormSelectField } from "../../../form/components/FormSelectField";
import { FormTextField } from "../../../form/components/FormTextField";
import { HttpRequestFormFields } from "../../../form/components/HttpRequestFormFields";
import FormParser from "../../../form/FormParser";
import { useCreateWorkflowTask } from "../../../hooks/useCreateWorkflowTask";
import { IBasePanel } from "../../BasePanel";
import BorderedBox from "../../BorderBox";
import { PanelContainer } from "../../PanelContainer";
import ResourceLimitsForm from "./ResourceLimitsForm";

enum ProcessorType {
  job = "job",
  batch = "batch",
  api = "api",
}

const createTopicName = (
  companyId: number,
  processorName: string,
  processorType: string
): string => {
  return `${companyId}_${processorName}_${processorType}`;
};

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
  batchSize: string;
  resourceLimits: {
    small: {
      threshold: number;
      cpu: number;
      memory: number;
    };
    medium: {
      threshold: number;
      cpu: number;
      memory: number;
    };
    large: {
      threshold: number;
      cpu: number;
      memory: number;
    };
  };
  inputParameters: object;
  httpRequest: {
    method: "GET";
    requestUrl: "";
    authToken: "";
    queryParams: [{ key: ""; value: "" }];
    body: {};
  };
  configuredInput: Record<string, any>;
}

export const ProcessorPanel: React.FC<IBasePanel> = ({
  node,
  toggleOpen,
  companyId,
}) => {
  const { onUpdateTaskAndNode } = useWorkflowContext();
  const defaultForm = (node?.data?.formData as IProcessorForm) ?? {};
  const getWorkflowTask = useCreateWorkflowTask();

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
    const { inputParameters, ...remainingData } = data;
    const fixedInputParameters = {
      data: "${workflow.variables}",
      ...(node.data.formData?.inputParameters ?? {}),
      processorName: node.data.nodeName,
      topic: createTopicName(companyId, node.data.nodeName, data.processorType),
      ...remainingData,
      ...inputParameters,
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
            {selectedProcessorType.value !== ProcessorType.api && (
              <>
                <FormTextField name="image" label="Docker Image URL" />
                <FormTextField name="queueDepth" label="Queue Depth" />
              </>
            )}

            {selectedProcessorType.value === ProcessorType.batch && (
              <FormTextField name="batchSize" label="Batch Size" />
            )}
            {selectedProcessorType.value === ProcessorType.api && (
              <HttpRequestFormFields fieldName="httpRequest" />
            )}
            {selectedProcessorType.value !== ProcessorType.api && (
              <BorderedBox
                title="Resource Limit"
                subTitle="Define your resource limit which will determined on basis of asset size"
              >
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <BorderedBox title="Small">
                    <ResourceLimitsForm field="resourceLimits.small" />
                  </BorderedBox>
                  <BorderedBox title="Medium">
                    <ResourceLimitsForm field="resourceLimits.medium" />
                  </BorderedBox>
                  <BorderedBox title="Large">
                    <ResourceLimitsForm field="resourceLimits.large" />
                  </BorderedBox>
                </Stack>
              </BorderedBox>
            )}
          </BorderedBox>
        )}
        <FormJsonEditor
          name="inputParameters"
          label="Input Parameters"
          jsonEditorVariableSuggestions={["workflow.xyz", "workflow.abc"]}
          jsonEditorHeight="400px"
        />
      </FormProvider>
      {node?.data?.form && (
        <BorderedBox title="User Configured Inputs">
          <FormParser
            formData={[]}
            fieldName="configuredInput"
          />
        </BorderedBox>
      )}
    </PanelContainer>
  );
};
