import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useWorkflowContext } from "../../context/WorkflowContext";
import { FormCheckbox } from "../../form/components/FormCheckbox";
import { FormJsonEditor } from "../../form/components/FormJsonEditor";
import { useCreateWorkflowTask } from "../../hooks/useCreateWorkflowTask";
import { IBasePanel } from "../BasePanel";
import { PanelContainer } from "../PanelContainer";

interface IDefaultPanelForm {
  inputParameters: object;
  isCallbackRequired: boolean;
}

export const DefaultPanel: React.FC<IBasePanel> = ({ node, toggleOpen }) => {
  const { onUpdateTaskAndNode } = useWorkflowContext();
  const defaultForm = (node?.data?.formData as IDefaultPanelForm) ?? {};
  const getWorkflowTask = useCreateWorkflowTask();

  const methods = useForm<IDefaultPanelForm>({
    defaultValues: defaultForm,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IDefaultPanelForm) => {
    // create task for processor
    const task = getWorkflowTask(
      node.id,
      node.data.conductorConfig.name,
      `${node.data.nodeName}-${node.id}`,
      node.data.conductorConfig.type
    );

    const fixedInputParameters = {
      data: "${workflow.variables}",
      ...data?.inputParameters,
    };
    // is callback is checked then create task for wait task

    if (data.isCallbackRequired) {
      onUpdateTaskAndNode(node, task, data, fixedInputParameters, true);
    } else {
      // if wait task is unchecked then remove the wait task
      onUpdateTaskAndNode(node, task, data, fixedInputParameters, false);
    }
  };

  return (
    <PanelContainer
      label={node.data.nodeLabel}
      onSave={handleSubmit(onSubmit)}
      toggleOpen={toggleOpen}
      inputContent={defaultForm}
    >
      <FormProvider {...methods}>
        <FormCheckbox
          name="isCallbackRequired"
          label="Task requires callback url to complete ?"
        />
        <FormJsonEditor
          name="inputParameters"
          label="Input Parameters"
          jsonEditorVariableSuggestions={["workflow.xyz", "workflow.abc"]}
          jsonEditorHeight="400px"
        />
      </FormProvider>
    </PanelContainer>
  );
};
