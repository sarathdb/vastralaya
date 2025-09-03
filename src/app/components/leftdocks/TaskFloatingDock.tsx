import React, { useState } from "react";
import { Paper, Box } from "@mui/material";
import { templates } from "../PipelineIcons";
import { IActivity, IActivityConfig } from "./TaskPanel";
import PanelItem from "./PanelItem";
import SubPanel from "./SubPanel";

const FloatingDock = () => {
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
    <>
      <Paper
        sx={{
          position: "fixed",
          top: "50%", // Center vertically
          left: 20, // Dock is on the left
          transform: "translateY(-50%)", // Ensures perfect centering
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 1,
          overflowY: "auto", // Enable vertical scrolling if needed
          width: showSubPanel ? 200 : 140,
          // width: 160,
          backgroundColor: "orange",
        }}
        elevation={0}
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
              // width: "300px",
              width: "140px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)", // Softer border
              boxSizing: "border-box",
              boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)", // Floating effect
              borderRadius: "20px",
              backdropFilter: "blur(10px)", // Glassy blur effect
              WebkitBackdropFilter: "blur(10px)", // Safari support
              transition: "all 0.3s ease-in-out", // Smooth animations
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))",
              backgroundColor: "green",
            }}
          >
            {Object.keys(taskTemplates).map((activityCategoryId, index) => {
              return (
                <>
                  {taskTemplates[activityCategoryId].activityCategoryId !==
                    0 && (
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
      </Paper>
    </>
  );
};

export default FloatingDock;

//   return (
//     <Paper
//       sx={{
//         position: "fixed",
//         bottom: "40%",
//         left: 20, // Dock is now positioned on the left
//         display: "flex",
//         flexDirection: "column", // Stack icons vertically
//         gap: 2,
//         p: 1,
//         borderRadius: "16px",
//         boxShadow: 3,
//         // backgroundColor: "rgba(255, 255, 255, 0.9)",
//         backgroundColor: "red",
//         width: "100px",
//       }}
//     >
//       <IconButton>
//         <HomeIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <SettingsIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <HomeIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <SettingsIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <HomeIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <SettingsIcon fontSize="large" />
//       </IconButton>
//     </Paper>
//   );
//   //   return (
//   //     // <Drawer
//   //     //   anchor="left"
//   //     //   open={open}
//   //     //   onClose={onClose}
//   //     //   PaperProps={{
//   //     //     sx: {
//   //     //       width: 100,
//   //     //       height: "50%",
//   //     //       marginTop: 30,
//   //     //       backgroundColor: "transparent",
//   //     //     },
//   //     //   }}
//   //     // >
//   //     <Paper
//   //       sx={{
//   //         position: "fixed",
//   //         //bottom: 20,
//   //         left: 20,
//   //         top: "50%",
//   //         // left: "50%",
//   //         transform: "translateY(-50%)",
//   //         display: "flex",
//   //         gap: 2,
//   //         p: 1,
//   //         borderRadius: "16px",
//   //         boxShadow: 3,
//   //         backgroundColor: "rgba(255, 255, 255, 0.9)",
//   //       }}
//   //     >
//   //       <IconButton>
//   //         <HomeIcon fontSize="large" />
//   //       </IconButton>
//   //       <IconButton>
//   //         <FavoriteIcon fontSize="large" />
//   //       </IconButton>
//   //       <IconButton>
//   //         <SettingsIcon fontSize="large" />
//   //       </IconButton>
//   //     </Paper>
//   //     // </Drawer>
//   //   );
// };

// export default FloatingDock;

//   return (
//     <Drawer
//       anchor="left"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: 100,
//           height: "50%",
//           marginTop: 30,
//           backgroundColor: "transparent",
//         },
//       }}
//     >
//       <Typography
//         variant="h6"
//         color="primary"
//         sx={{
//           p: 2,
//           position: "sticky",
//           top: 0,
//           backgroundColor: "#f5f5f5",
//           zIndex: 1,
//         }}
//       >
//         Categories
//       </Typography>
//       <Box
//         sx={{
//           overflow: "auto",
//           // height: "calc(100% - 56px)",
//           height: "100%",

//           backgroundColor: "white",
//         }}
//       >
//         {productCategories.map((category) => (
//           <Box
//             key={category.name}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               p: 2,
//               "&:hover": {
//                 backgroundColor: "rgba(0, 0, 0, 0.04)",
//                 cursor: "pointer",
//               },
//             }}
//           >
//             <IconButton color="primary" size="large">
//               {category.icon}
//             </IconButton>
//             {/* <Typography variant="body1" sx={{ ml: 2 }}>
//               {category.name}
//             </Typography> */}
//           </Box>
//         ))}
//       </Box>
//     </Drawer>
//   );
// };

// export default ProductsDock;
