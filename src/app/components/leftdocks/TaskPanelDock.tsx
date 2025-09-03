import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { templates } from "../PipelineIcons";
import { IActivity, IActivityConfig } from "./TaskPanel";
import PanelItem from "./PanelItem";
import SubPanel from "./SubPanel";

interface TaskPanelDockProps {
  open: boolean;
  onClose: () => void;
}

const TaskPanelDock: React.FC<TaskPanelDockProps> = ({ onClose }) => {
  const taskTemplates = templates;
  console.log("task templates", taskTemplates);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>(null);

  const [selectedActivityConfig, setSelectedActivityConfig] = useState<
    IActivityConfig[]
  >([]);
  const [showSubPanel, setShowSubPanel] = useState<boolean>(false);

  //   const defaultStyle = useMemo(() => styles(showSubPanel), [showSubPanel]);

  const onClickPanelItem = (e: any, activity: IActivity) => {
    console.log(e);
    
    console.log("activity ***", activity);
    const activityConfig = activity.activityConfig;
    console.log("activityConfig", activityConfig);
    if (selectedActivity?.activityKey === activity.activityKey) {
      setShowSubPanel(false);
      setSelectedActivity(null);
      setSelectedActivityConfig([]);
    } else {
      setShowSubPanel(true);
      setSelectedActivity(activity);
      setSelectedActivityConfig(activityConfig);
    }
    // setSelectedActivity(activity);
    // setSelectedActivityConfig(activityConfig);
  };
  return (
    <Drawer
      anchor="left"
      open={true}
      onClose={onClose}
      ModalProps={{ BackdropProps: { invisible: true } }}
      PaperProps={{
        elevation: 0,
        sx: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 180,
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
            // height: "100%",
            width: "120px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.3)", // Softer border
            boxSizing: "border-box",
            boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)", // Floating effect
            borderRadius: "20px",
            // background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
            backdropFilter: "blur(10px)", // Glassy blur effect
            WebkitBackdropFilter: "blur(10px)", // Safari support
            transition: "all 0.3s ease-in-out", // Smooth animations
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))",
          }}
        >
          {Object.keys(taskTemplates).map((activityCategoryId, index) => {
            return (
              <>
                {taskTemplates[activityCategoryId].activityCategoryId !== 0 && (
                  <PanelItem
                    index={index}
                    selectedActivity={selectedActivity}
                    taskTemplates={taskTemplates}
                    activityCategoryId={activityCategoryId}
                    onClickPanelItem={onClickPanelItem}
                  />
                )}
              </>
            );
          })}
        </Box>
        {showSubPanel && <SubPanel configItems={selectedActivityConfig} />}
      </Box>
    </Drawer>
  );
};

export default TaskPanelDock;
