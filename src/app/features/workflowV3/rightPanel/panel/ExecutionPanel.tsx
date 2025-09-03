import React, { useMemo } from "react";
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
import { TaskStatusTypes } from "../../enum/TaskStatus";

export const ExecutionPanel: React.FC<IBasePanel> = ({
  node,
  toggleOpen,
  executionWorkflow,
}) => {
  const workflowDetails = useMemo(() => {
    return executionWorkflow?.tasks?.map((task: Record<string, any>) => {
      const details = [
        { title: "Task Name", value: task.taskDefName },
        { title: "Start Time", value: getWorkflowDateFormat(task.startTime) },
        { title: "End Time", value: getWorkflowDateFormat(task.endTime) },
        {
          title: "Duration",
          value: calculateDuration(task.startTime, task.endTime),
        },
        { title: "Status", value: task.status },
      ];
      if (task.status === TaskStatusTypes.FAILED) {
        details.splice(4, 0, {
          title: "Reason for Incompletion",
          value: task.reasonForIncompletion,
        });
      }
      return details;
    });
  }, [executionWorkflow]);

  return (
    <PanelContainer
      label={node.data.nodeLabel}
      onSave={() => {}}
      toggleOpen={toggleOpen}
      inputContent={executionWorkflow?.tasks?.[0]?.inputData}
      outputContent={
        executionWorkflow?.tasks?.[executionWorkflow?.tasks?.length - 1]
          ?.outputData?.response?.body
      }
      isReadOnly={true}
      tasks={executionWorkflow?.tasks}
    >
      {workflowDetails?.map(
        (workflowData: Record<string, any>[], index: number) => (
          <BorderedBox key={index} title={`Task ${index + 1}`}>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  {workflowData.map((row: Record<string, any>, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {row.title}
                      </TableCell>
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
        )
      )}
    </PanelContainer>
  );
};