import React from "react";
import NotificationBoundary from "./NotificationBoundary";
import WorkflowCanvasContainer from "./WorkflowCanvasContainer";

const WorkflowBoundaryContainer = () => {
    return (
        <NotificationBoundary>
            <WorkflowCanvasContainer />
        </NotificationBoundary>
    );
}

export default WorkflowBoundaryContainer;