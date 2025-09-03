import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-resizable/css/styles.css";
// import ReactFlowWrapper from "../../app/workflow";
// import ReactFlowWrapperV2 from "../../app/workflowV2";

import sideMenuStore, { SideMenuItem } from "../../sideMenu/sidemenuStore";
// import SolutionBuilderWrapper from "../solutionBuilder";

// import Metadata from "../taxonomy/metadata";

// import Component from "../builders/component";
// import Form from "../builders/form";
// import Page from "../builders/page";
// import Header from "../../components/header/Header";

import AppHeader from "../../components/AppHeader";

// import DesignerGroups from "../admin/designerGroups";
// import Groups from "../admin/groups";
// import Permissions from "../admin/permissions";
// import Roles from "../admin/roles";
// import PlaygroundTabbedComponents from "../playground";
// import RulesBuilderWrapper from "../rules";
// import Settings from "../settings";
// import dataSourceStore from "../settings/dataSource/store";
import LeftMenu from "../../sideMenu";
// import AssetSubtypes from "../taxonomy/assetSubtypes";
import AssetType from "../taxonomy/assetType/AssetType";
import AssetSubType from "../taxonomy/assetType/AssetSubType";

import useWindowDimensions from "../../utils/useWindowDimensions";

// import ConnectionTabs from "../settings/connections";
// import LocaleComponent from "../settings/locale";

// import ApplicationDetails from "../applications/applicationDetails";
// import MigrationTabbedComponents from "../applications/migrationTabbedComponents";

// import AIConnectors from "../aiData/connectors";
// import AIJobs from "../aiData/jobs";
// import AIPipelines from "../aiData/pipelines";
// import cloneStore, { CloneStore } from "../clone/store";
// import Companies from "../company";
// import { DataConnectors } from "../dataConnectors";
// import { DataExplorer } from "../dataExplorer";
// import Action from "../rules/action";
// import ExceptionType from "../rules/exceptionType";
// import AssetCategories from "../taxonomy/subtypeCategory";
// import Users from "../users";
// import workFlowStore from "../workflow/workFlowStore";
// import workFlowStoreV2 from "../workflowV2/workFlowStore";
import WorkflowBoundaryContainer from "../workflow/WorkflowBoundaryContainer";
import WorkflowList from "../workflowV3/wrapper/WorkflowList";

import WorkflowCanvas from "../computingflow/WorkflowCanvas";
import Metadata from "../taxonomy/assetType/Metadata";
import SubTypeCategory from "../taxonomy/assetType/SubTypeCategory";

function Home() {
  const [menu, setMenu] = useState<SideMenuItem>(
    sideMenuStore.getSelectedSubMenu()
      ? sideMenuStore.getSelectedSubMenu()
      : sideMenuStore.getSelectedMenu()
  );
  // const [open, setOpen] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [bodyHeight, setBodyHeight] = React.useState(0);
  const { height: windowHeight } = useWindowDimensions();

  // useEffect(() => {
  //   const subscription = cloneStore
  //     .getState()
  //     .subscribe((state: CloneStore) => {
  //       const { open } = state;
  //       setOpen(open);
  //     });
  //   return () => subscription.unsubscribe();
  // }, []);

  const headerRef = React.useCallback((node) => {
    if (node !== null) {
      setHeaderHeight(node.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    setBodyHeight(windowHeight - headerHeight);
  }, [windowHeight, headerHeight]);

  useEffect(() => {
    const subscription = sideMenuStore.getState().subscribe((state: any) => {
      const { selectedSubMenu, selectedMenu } = state;
      setMenu(selectedSubMenu ? selectedSubMenu : selectedMenu);
    });
    return () => subscription.unsubscribe();
  }, []);

  const renderBody = (item: SideMenuItem) => {
    console.log("Render Body", item);

    // dataSourceStore.setDataSourceResponse(null);
    // dataSourceStore.setSelectedDataSource(null);
    console.log("item id", item?.id);
    switch (item?.id) {      
      case "assetType":
        return <AssetType />;
      case "assetSubType":
        return <AssetSubType />;
      case "metadata":
        return <Metadata />;
      // case "classification":
      //   return <AssetSubtypes />;

      // case "solutions":
      //   return <SolutionBuilderWrapper />;
      // case "workflows":
      //   workFlowStore.disableWorkFlowCanvas();
      //   workFlowStore.enablePipelineFlag(false);
      //   //workFlowStore.enableWorkFlowCanvas(null);
      //   return <ReactFlowWrapper />;
      // case "workflowsv2":
      //   workFlowStoreV2.disableWorkFlowCanvas();
      //   workFlowStoreV2.enablePipelineFlag(false);
      //   //workFlowStore.enableWorkFlowCanvas(null);
      //   return <ReactFlowWrapperV2 />;
      case "workflows":
        return <WorkflowBoundaryContainer />;
      // case "groups":
      //   return <Groups />;
      // case "designerGroups":
      //   return <DesignerGroups />;
      case "roles":
        return <WorkflowCanvas />;
      // case "permissions":
      //   return <Permissions />;
      // case "localization":
      //   return <LocaleComponent />;
      // case "details":
      //   return <ApplicationDetails />;
      // case "migration":
      //   return <MigrationTabbedComponents />;
      // case "component":
      //   return <Component />;
      // case "form":
      //   return <Form />;
      // case "page":
      //   return <Page />;
      // case "settings":
      //   return <Settings />;
      // case "rulesLibrary":
      //   return <RulesBuilderWrapper />;
      // case "playground":
      //   return <PlaygroundTabbedComponents />;
      case "connectors":
        return <WorkflowList />;
      // case "companies":
      //   return <Companies />;
      // case "users":
      //   return <Users />;
      case "subtypeCategory":
        return <SubTypeCategory />;
      // case "action":
      //   return <Action />;
      // case "exceptionType":
      //   return <ExceptionType />;
      // case "dataExplorer":
      //   return <DataExplorer />;
      // case "dataConnectors":
      //   return <DataConnectors />;
      // case "aiConnectors":
      //   return <AIConnectors />;
      // case "aiJobs":
      //   return <AIJobs />;
      // case "aiPipelines":
      //   return <AIPipelines />;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
      }}
    >
      <Box
        sx={{
          flexDirection: "row",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <LeftMenu />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            //65px - left menu width
            width: "calc(100% - 65px)",
          }}
        >
          <Box
            ref={headerRef}
            sx={{
              width: "100%",
              left: 0,
              top: 0,
              display: "flex",
              position: "sticky",
              zIndex: 100,
            }}
          >
            {/* <Header backgroundColor={"#1E417A"} /> */}
            <AppHeader />
          </Box>

          <Box
            sx={{
              zIndex: 1,
              margin: "0px",
              padding: "0px",
              display: "flex",
              flex: 1,
              height: "100%",
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "#1E417A",
            }}
          >
            <Box
              component="main"
              sx={{
                display: "flex",
                flex: 1,
                height: bodyHeight,
                overflow: "hidden",
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderBottomLeftRadius: "24px",
                zIndex: 2,
                padding: 2,
              }}
            >
              {renderBody(menu)}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <SnackbarView />
      <ApplicationAuthorize />
      <Preview />
      {open && <CreateImportSolution />}
      <CompanySelection /> */}
    </Box>
  );
}

export default Home;
