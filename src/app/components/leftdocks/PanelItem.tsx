import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
// import { CSSObject } from "@mui/material";
import { getPanelIconByTitle } from "../PipelineIcons";
import { IActivity } from "./TaskPanel";

interface IPanelItem {
  index: number;
  taskTemplates: any;
  activityCategoryId: any;
  selectedActivity: IActivity;
  onClickPanelItem: (event: any, activity: IActivity) => void;
}

// const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     height: "110px",
//     cursor: "pointer",
//     "&:hover": {
//       cursor: "pointer",
//     },
//     flexDirection: "column",
//     backgroundColor: "#F9F9F9",
//     boxSizing: "border-box",
//   },
//   iconContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//     width: "100%",
//     cursor: "grab",
//     boxSizing: "border-box",
//     overflow: "hidden",
//   },
//   templateName: {
//     font: "Inter",
//     fontSize: "11px",
//     whiteSpace: "normal",
//     wordWrap: "break-word",
//     textAlign: "center",
//     color: "gray",
//   },
//   divider: { width: "100%", height: "1px", backgroundColor: "gray" },
// });
const PanelItem = ({
  index,
  taskTemplates,
  activityCategoryId,
  selectedActivity,
  onClickPanelItem,
}: IPanelItem) => {
  // const defaultStyle = useMemo(() => styles(), []);

  return (
    // <Box
    //   key={index}
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: "100%", // ✅ Auto fit within grid
    //     height: "60px", // ✅ Reduce height for compact layout
    //     cursor: "pointer",
    //     backgroundColor:
    //       selectedActivity?.activityCategoryId === activityCategoryId
    //         ? "#E0F7FA"
    //         : "#F9F9F9", // ✅ Highlight selected item
    //     padding: "2px", // ✅ Minimize padding
    //     borderRadius: "8px",
    //     transition: "all 0.2s ease-in-out",
    //     overflow: "hidden", // ✅ Prevents text overflow
    //     minWidth: 0, // ✅ Fixes flexbox overflow issue
    //     "&:hover": {
    //       transform: "scale(1.05)", // ✅ Reduced scale to prevent breaking layout
    //       backgroundColor: "#E3F2FD", // ✅ Light hover effect color
    //     },
    //   }}
    //   draggable={index === 0}
    //   onClick={(e) => {
    //     onClickPanelItem(e, taskTemplates[activityCategoryId]);
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       height: "100%",
    //       width: "100%",
    //       cursor: "grab",
    //       boxSizing: "border-box",
    //       textAlign: "center",
    //       overflow: "hidden", // ✅ Prevents text overflow
    //     }}
    //   >
    //     <IconButton
    //       sx={{ marginBottom: "0px", backgroundColor: "yellow" }}
    //       size="small"
    //       disableRipple
    //     >
    //       {getPanelIconByTitle(
    //         taskTemplates[activityCategoryId].activityCategoryIcon
    //       )}
    //     </IconButton>
    //     <Typography
    //       variant="caption"
    //       sx={{
    //         fontSize: "8px",
    //         textAlign: "center",
    //         color: "gray",
    //         whiteSpace: "normal", // ✅ Allows wrapping
    //         wordBreak: "break-word", // ✅ Ensures long words wrap
    //         overflowWrap: "break-word", // ✅ Alternative for breaking long words
    //         display: "-webkit-box",
    //         WebkitBoxOrient: "vertical",
    //         WebkitLineClamp: 2, // ✅ Limit to 2 lines
    //         maxWidth: "100%", // ✅ Prevents overflow
    //         maxHeight: "20px", // ✅ Limit height to prevent border overflow
    //         overflow: "hidden", // ✅ Ensures text stays within bounds

    //         backgroundColor: "blue",
    //       }}
    //     >
    //       {taskTemplates[activityCategoryId].activityCategoryName}
    //     </Typography>
    //   </Box>
    // </Box>

    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", // ✅ Auto fit within grid
        height: "65px", // ✅ Reduce height for compact layout
        cursor: "pointer",
        backgroundColor:
          selectedActivity?.activityCategoryId === activityCategoryId
            ? "#E0F7FA"
            : "#F9F9F9", // ✅ Highlight selected item
        padding: "2px", // ✅ Minimize padding
        borderRadius: "8px",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)", // ✅ Zoom effect on hover
          backgroundColor: "#E3F2FD", // ✅ Light hover effect color
        },
      }}
      draggable={index === 0 ? true : false}
      onClick={(e) => {
        onClickPanelItem(e, taskTemplates[activityCategoryId]);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          cursor: "grab",
          boxSizing: "border-box",
          textAlign: "center", // ✅ Ensure text alignment
        }}
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   height: "100%",
        //   width: "100%",
        //   cursor: "grab",
        //   boxSizing: "border-box",
        //   overflow: "hidden",
        // }}
      >
        <IconButton sx={{ marginBottom: "0px" }} size="small" disableRipple>
          {getPanelIconByTitle(
            taskTemplates[activityCategoryId].activityCategoryIcon
          )}
        </IconButton>
        <Typography
          variant="caption"
          // sx={{
          //   fontSize: "8px", // ✅ Minimize text size
          //   textAlign: "center",
          //   color: "gray",
          //   whiteSpace: "normal", // ✅ Allow text to wrap
          //   overflow: "hidden",
          //   textOverflow: "ellipsis",
          //   backgroundColor: "orange",
          //   display: "-webkit-box",
          //   WebkitLineClamp: 2, // ✅ Limit to 2 lines
          //   WebkitBoxOrient: "vertical",
          //   maxWidth: "100%", // ✅ Prevent overflow
          // }}

          sx={{
            fontSize: "8px",
            textAlign: "center",
            color: "gray",
            whiteSpace: "normal", // ✅ Allows wrapping
            wordBreak: "break-word", // ✅ Ensures long words wrap
            overflowWrap: "break-word", // ✅ Alternative for breaking long words
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // ✅ Limit to 2 lines
            maxWidth: "100%", // ✅ Prevents overflow
            lineHeight: "1",
            overflow: "hidden",
          }}
        >
          {taskTemplates[activityCategoryId].activityCategoryName}
        </Typography>
      </Box>
    </Box>
  );
};

export default PanelItem;
