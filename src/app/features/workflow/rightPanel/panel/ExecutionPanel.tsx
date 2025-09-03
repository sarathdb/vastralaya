import React from "react";
import BorderedBox from "../BorderBox";
import { PanelContainer } from "../PanelContainer";
import { IBasePanel } from "../BasePanel";
import { calculateDuration, getWorkflowDateFormat } from "../../utils/Utils";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getWorkflowStatusColor } from "../../utils/Utils";

export const ExecutionPanel: React.FC<IBasePanel> = ({
  node,
  toggleOpen,
  executionWorkflow,
}) => {
  const startTask =
    executionWorkflow?.tasks?.length > 0 && executionWorkflow?.tasks[0];
  const setVaraibleTask =
    executionWorkflow?.tasks?.length > 0 && executionWorkflow?.tasks[1];

  const workflowData = [
    { title: "Workflow Name", value: executionWorkflow.workflowName },
    { title: "Version", value: executionWorkflow.workflowVersion },
    {
      title: "Start Time",
      value: getWorkflowDateFormat(executionWorkflow.startTime),
    },
    {
      title: "End Time",
      value: getWorkflowDateFormat(executionWorkflow.endTime),
    },
    {
      title: "Duration",
      value: calculateDuration(
        executionWorkflow.startTime,
        executionWorkflow.endTime
      ),
    },
    {
      title: "Reason for Incompletion",
      value: executionWorkflow.reasonForIncompletion,
    },
    {
      title: "Status",
      value: executionWorkflow.status,
    },
  ];
  const subWorkflowData = [
    { title: "Sub Task Name", value: setVaraibleTask.taskDefName },
    {
      title: "Status",
      value: setVaraibleTask.status,
    },
  ];

  return (
    <PanelContainer
      label={node.data.nodeLabel}
      onSave={() => {}}
      toggleOpen={toggleOpen}
      inputContent={startTask.inputData}
      outputContent={startTask.outputData?.response?.body}
      isReadOnly={true}
    >
      <BorderedBox title="Workflow Details">
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              {workflowData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>{row.title}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.title === "Status"
                          ? getWorkflowStatusColor(row.value)
                          : "black",
                    }}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BorderedBox>
      <BorderedBox title="Subtask">
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              {subWorkflowData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>{row.title}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.title === "Status"
                          ? getWorkflowStatusColor(row.value)
                          : "black",
                    }}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BorderedBox>
    </PanelContainer>
  );
};
