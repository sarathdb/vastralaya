import React, { useState } from "react";
import { Paper, Box } from "@mui/material";
import { templates } from "../PipelineIcons";
import { IActivity, IActivityConfig } from "../leftdocks/TaskPanel";
import HPanelItem from "./HPanelItem";
import HSubPanel from "./HSubPanel";

const HorizontalDock = () => {
  const taskTemplates = templates;
  console.log("task templates", taskTemplates);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>(null);

  const [selectedActivityConfig, setSelectedActivityConfig] = useState<
    IActivityConfig[]
  >([]);
  const [showSubPanel, setShowSubPanel] = useState<boolean>(false);

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
  };
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 20, // Stick to bottom (adjust as needed)
          left: "50%", // Center horizontally
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column", // ✅ Horizontal flow
          alignItems: "center",
          //   gap: 1.5, // Adjust spacing between items
          //   p: 1,
          overflowX: "auto", // ✅ Horizontal scroll if needed
          overflowY: "hidden",
          height: showSubPanel ? 160 : 80, // ✅ Height adjusts if subpanel visible
          //   minHeight: "80px", // Minimum height for dock
          //   backgroundColor: "rgba(255, 255, 255, 0.3)",
          //   borderRadius: "16px",
          //   boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
          //   backdropFilter: "blur(10px)",
          //   WebkitBackdropFilter: "blur(10px)",
          //   transition: "all 0.3s ease",
          zIndex: 1300, // Stay above content
          backgroundColor: "transparent",
        }}
        elevation={0}
      >
        {/* Dock Items */}
        <Box
          sx={{
            display: "flex", // ✅ Simple horizontal container for icons
            flexDirection: "row",
            alignItems: "center",
            gap: 1, // Space between icons
            // backgroundColor: "purple",
            p: 1,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "16px",
            boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            marginBottom: 0,
          }}
        >
          {Object.keys(taskTemplates).map(
            (activityCategoryId, index) =>
              taskTemplates[activityCategoryId].activityCategoryId !== 0 && (
                <HPanelItem
                  key={index}
                  index={index}
                  selectedActivity={selectedActivity}
                  taskTemplates={taskTemplates}
                  activityCategoryId={activityCategoryId}
                  onClickPanelItem={onClickPanelItem}
                />
              )
          )}
        </Box>

        {/* Optional SubPanel attached to dock */}
        {showSubPanel && <HSubPanel configItems={selectedActivityConfig} />}
      </Paper>
    </>
  );
};

export default HorizontalDock;
