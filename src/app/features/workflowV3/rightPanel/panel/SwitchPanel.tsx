import React from "react";
import { PanelContainer } from "../PanelContainer";
import { IBasePanel } from "../BasePanel";
import { Stack, Typography } from "@mui/material";
import BorderedBox from "../BorderBox";
import { FormJSEditor } from "../../form/components/FormJSEditor";

export const SwitchPanel: React.FC<IBasePanel> = ({
  node,
  toggleOpen,
  switchNodes,
}) => {
  const generatedSwitchScript = `// Auto-generated Script
(function () {
  switch ($.switchCaseValue) {
    ${switchNodes
      .map(
        (node, idx) =>
          `case "${node.data.nodeLabel}": return "Case_${idx + 1}";`
      )
      .join("\n    ")}
    default: return "Default_Case";
  }
}())`;

  return (
    <PanelContainer
      label={node?.data?.nodeLabel}
      onSave={() => {}}
      toggleOpen={toggleOpen}
      inputContent={node?.data?.inputData}
    >
      <Stack spacing={2}>
        {switchNodes.map((switchNode, index) => (
          <BorderedBox key={switchNode.id} title={`Case ${index + 1}`}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ fontWeight: 500, minWidth: 60 }}>
                  Node ID:
                </Typography>
                <Typography>{switchNode.id}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ fontWeight: 500, minWidth: 60 }}>
                  Node:
                </Typography>
                <Typography>{switchNode.data.nodeLabel}</Typography>
              </Stack>
            </Stack>
          </BorderedBox>
        ))}
        <FormJSEditor
          name="inputParameters"
          label="Input Parameters"
          jsEditorVariableSuggestions={["workflow.xyz", "workflow.abc"]}
          jsEditorHeight="400px"
        />
      </Stack>
    </PanelContainer>
  );
};
