import CloseIcon from "@mui/icons-material/Close";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import JsonEditor from "./JsonEditor";
import { FormSelectField } from "../form/components/FormSelectField";
import { FormProvider, useForm } from "react-hook-form";

interface IPanelContainer extends PropsWithChildren {
  toggleOpen: () => void;
  onSave: () => void;
  label: string;
  inputContent: Record<string, any>;
  outputContent?: Record<string, any>;
  isReadOnly?: boolean;
  tasks?: Record<string, any>[];
}

const styles = {
  header: {
    alignContents: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    color: "#1e417a",
    padding: "16px",
  },
  body: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    maxHeight: "calc(100% - 60px)",
  },
  icon: {
    color: "#1e417a",
  },
  breadcrumbTypography: {
    fontSize: "small",
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
};

type ViewType = "action" | "input" | "output";

export const PanelContainer: React.FC<IPanelContainer> = ({
  toggleOpen,
  label,
  children,
  onSave,
  inputContent,
  outputContent = {},
  isReadOnly,
  tasks,
}) => {
  const [activeView, setActiveView] = useState<ViewType>("action");

  const taskList = tasks?.map((task) => {
    return {
      label: task.taskType,
      value: task.taskType,
      inputData: task.inputData,
      outputData: task.outputData?.response?.body,
    };
  });
  let methods = useForm<Record<string, any>>({
    defaultValues: {
      taskType: taskList?.length > 0 ? taskList[0].label : "",
    },
  });

  const { watch } = methods;
  const selectedTaskType = watch("taskType");
  const selectedTask = taskList?.find(
    (task) => task.label === selectedTaskType
  );

  const inputJson =
    isReadOnly && selectedTask ? selectedTask?.inputData : inputContent;
  const outputJson =
    isReadOnly && selectedTask ? selectedTask?.outputData : outputContent;

  return (
    <Stack height="100%" display="flex" flexDirection="column">
      {/* Header Section */}
      <Stack sx={styles.header}>
        <Typography variant="h6">{label}</Typography>
        <IconButton onClick={toggleOpen} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Stack p={2}>
        <Breadcrumbs separator="›">
          <Link
            component="button"
            color={activeView === "action" ? "primary" : "inherit"}
            onClick={() => setActiveView("action")}
            underline={activeView === "action" ? "always" : "hover"}
          >
            <Typography sx={styles.breadcrumbTypography} component={"div"}>
              <WhatshotIcon fontSize="small" />
              Action
            </Typography>
          </Link>
          <Link
            component="button"
            color={activeView === "input" ? "primary" : "inherit"}
            onClick={() => setActiveView("input")}
            underline={activeView === "input" ? "always" : "hover"}
          >
            <Typography sx={styles.breadcrumbTypography} component={"div"}>
              <EditCalendarIcon fontSize="small" />
              Input
            </Typography>
          </Link>
          <Link
            component="button"
            color={activeView === "output" ? "primary" : "inherit"}
            onClick={() => setActiveView("output")}
            underline={activeView === "output" ? "always" : "hover"}
          >
            <Typography sx={styles.breadcrumbTypography} component={"div"}>
              <ContentPasteGoIcon fontSize="small" />
              Output
            </Typography>
          </Link>
        </Breadcrumbs>
      </Stack>

      {/* Main content area with flex-grow to push buttons to bottom */}
      <FormProvider {...methods}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "80%",
          }}
        >
          {isReadOnly &&
            (activeView === "input" || activeView === "output") && (
              <Box sx={{ width: "60%", marginLeft: 2 }}>
                <FormSelectField
                  name="taskType"
                  label="Task Type"
                  options={taskList}
                  rules={{ required: "Please select the task type" }}
                />
              </Box>
            )}

          {/* Body Section */}
          <Stack sx={styles.body} flexGrow={1}>
            {activeView === "action" && children}
            {activeView === "input" && (
              <JsonEditor
                defaultJson={inputJson}
                isReadOnly
                label="Input"
                height="600px"
              />
            )}
            {activeView === "output" && (
              <JsonEditor
                defaultJson={outputJson}
                isReadOnly
                label="Output"
                height="600px"
              />
            )}
          </Stack>
          {!isReadOnly && (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button variant="outlined" onClick={toggleOpen}>
                Cancel
              </Button>
              <Button variant="contained" onClick={onSave}>
                Save
              </Button>
            </Stack>
          )}
        </Stack>
      </FormProvider>
    </Stack>
  );
};
