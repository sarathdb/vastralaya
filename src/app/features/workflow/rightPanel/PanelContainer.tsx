import CloseIcon from "@mui/icons-material/Close";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import JsonEditor from "./JsonEditor";

interface IPanelContainer extends PropsWithChildren {
  toggleOpen: () => void;
  onSave: () => void;
  label: string;
  inputContent: Record<string, any>;
  outputContent?: Record<string, any>;
  isReadOnly?: boolean;
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
}) => {
  const [activeView, setActiveView] = useState<ViewType>("action");

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
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "80%",
        }}
      >
        {/* Body Section */}
        <Stack sx={styles.body} flexGrow={1}>
          {activeView === "action" && children}
          {activeView === "input" && (
            <JsonEditor
              defaultJson={inputContent}
              isReadOnly
              label="Input"
              height="600px"
            />
          )}
          {activeView === "output" && (
            <JsonEditor
              defaultJson={outputContent}
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
    </Stack>
  );
};
