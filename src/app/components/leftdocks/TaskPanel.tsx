import { Box, styled } from "@mui/material";
import React, { useMemo, useState } from "react";
import PanelItem from "./PanelItem";
import SubPanel from "./SubPanel";

import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme } from "@mui/material/styles";

import { templates } from "../PipelineIcons";

export interface IActivity {
  activityKey: string;
  activityCategoryName: string;
  activityCategoryId: number;
  activityCategoryIcon: string;
  activityConfig: IActivityConfig[];
}
export interface IActivityConfig {
  activityOwner: string;
  activityIcon: string;
  activityTemplate: any;
  activityType: string;
  dxpActivityLabel: string;
  dxpTypeLabel: string;
  dxpActivityToolTip: string;
}

const styles = (
  showSubPanel: boolean
): { [key: string]: React.CSSProperties | CSSObject } => ({
  drawerContainer: {
    height: "98%",
    flexShrink: 0,
    display: "flex",
    // minWidth: showSubPanel ? 200 : 140,
    minWidth: 200,
    "& .MuiPaper-root": {
      position: "relative",
    },
  },
  drawerPaper: {
    width: 100,
    height: "100%",
    backgroundColor: "transparent",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    marginLeft: showSubPanel ? "unset" : "30px",
    marginTop: "20px",
    height: "95%",
  },
  panelContainer: {
    overflow: "auto",
    height: "100%",
    maxHeight: "90%",
    width: "120px",
    borderRadius: "20px",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    justifyContent: "center",
    alignItems: "center",
    paddingTop: -3,
    border: "1px solid gray",
    boxSizing: "border-box",
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
  },
});

const drawerWidth = "240";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface ITaskPanel {
  open: boolean;
  onClose: () => void;
}

const TaskPanel = ({ open, onClose }: ITaskPanel) => {
  const taskTemplates = templates;
  console.log("task templates", taskTemplates);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>(null);

  const [selectedActivityConfig, setSelectedActivityConfig] = useState<
    IActivityConfig[]
  >([]);
  const [showSubPanel, setShowSubPanel] = useState<boolean>(false);

  const defaultStyle = useMemo(() => styles(showSubPanel), [showSubPanel]);

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
      //   open={true}
      open={open}
      onClose={onClose}
      sx={defaultStyle.drawerContainer}
      PaperProps={{
        sx: defaultStyle.drawerPaper,
      }}
      variant="permanent"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          boxSizing: "border-box",
          marginLeft: showSubPanel ? "unset" : "30px",
          marginTop: "20px",
          height: "95%",
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
            height: "100%",
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

            backgroundColor: "orange",
          }}
          //   sx={{
          //     display: "grid",
          //     gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
          //     gap: "4px",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     padding: "4px",
          //     height: "100%",
          //     width: "120px",
          //     overflow: "hidden",
          //     border: "1px solid gray",
          //     boxSizing: "border-box",
          //     boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
          //     borderRadius: "20px",
          //   }}
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

export default React.memo(TaskPanel);
