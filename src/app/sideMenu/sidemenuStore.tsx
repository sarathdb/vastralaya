import { Subject } from "rxjs";
import {
  taxonomyIcon,
  homeIcon,
  designerIcon,
  solutionsIcon,
  adminIcon,
  groupIcon,
  dashboardIcon,
  assetTypesIcon,
  connectorsIcon,
  aiAssistantIcon,
  assetSubTypeIcon,
  metadataIcon,
  componentIcon,
  pageIcon,
  rolesIcon,
  permissionsIcon,
  localizationIcon,
  // controlsIcon,
  migrationIcon,
} from "../../assets";
import { workflowIcon, rulesIcon } from "../../assets";

export interface DxPFeature {
  id: string;
  name: string;
  icon?: any;
}

export interface SideMenuItem {
  id: string;
  title: string;
  icon?: any;
  parentId?: string;
  list?: any[];
}
export interface MenuColors {
  mainMenuBgColor?: string;
  mainMenuTextColor?: string;
  mainMenuHoverTextColor: string;
  mainMenuHoverColor?: string;
  mainMenuActiveColor?: string;
  subMenuBgColor?: string;
  subMenuTextColor?: string;
  subMenuHoverColor?: string;
}
export interface SideMenuStore {
  colors: MenuColors;
  list: SideMenuItem[];
  isMenuOpened: boolean;
  isSubMenuOpened: boolean;
  selectedMenu: SideMenuItem;
  selectedSubMenu: SideMenuItem;
  features: DxPFeature[];
  //isSubmenuOpened?: boolean;
}

export const taxonomyMenu: SideMenuItem = {
  id: "taxonomy",
  title: "Taxonomy",
  icon: taxonomyIcon,
  list: [
    {
      id: "assetType",
      title: "Asset Type",
      icon: assetTypesIcon,
      parentId: "taxonomy",
    },
    {
      id: "assetSubType",
      title: "Asset Subtype",
      icon: assetSubTypeIcon,
      parentId: "taxonomy",
    },
    {
      id: "metadata",
      title: "Metadata",
      icon: metadataIcon,
      parentId: "taxonomy",
    },
    {
      id: "subtypeCategory",
      title: "Subtype Category",
      icon: metadataIcon,
      parentId: "taxonomy",
    },
  ],
};

export const dashboardsMenu: SideMenuItem = {
  id: "dashboards",
  title: "Dashboards",
  icon: dashboardIcon,
};
export const companyMenu: SideMenuItem = {
  id: "companies",
  title: "Company",
  icon: dashboardIcon,
};
export const solutionMenu: SideMenuItem = {
  id: "solutions",
  title: "Solutions",
  icon: solutionsIcon,
};
export const workflowsMenu: SideMenuItem = {
  id: "workflows",
  title: "Workflows",
  icon: workflowIcon,
};

export const rulesMenu: SideMenuItem = {
  id: "rules",
  title: "Rules",
  icon: rulesIcon,
  list: [
    {
      id: "action",
      title: "Action",
      icon: rulesIcon,
      parentId: "rules",
    },
    {
      id: "exceptionType",
      title: "Task Type / Exception Type",
      icon: rulesIcon,
      parentId: "rules",
    },
    {
      id: "rulesLibrary",
      title: "Rules Library",
      icon: rulesIcon,
      parentId: "rules",
    },
  ],
};
export const connectorsMenu: SideMenuItem = {
  id: "connectors",
  title: "Connectors",
  icon: connectorsIcon,
};

export const adminMenu: SideMenuItem = {
  id: "admin",
  title: "Administration",
  icon: adminIcon,
  list: [
    {
      id: "groups",
      title: "Groups",
      icon: groupIcon,
      parentId: "admin",
    },
    {
      id: "roles",
      title: "Roles",
      icon: rolesIcon,
      parentId: "admin",
    },
    {
      id: "permissions",
      title: "Permissions",
      icon: permissionsIcon,
      parentId: "admin",
    },
    {
      id: "designerGroups",
      title: "Designer Groups",
      icon: groupIcon,
      parentId: "admin",
    },
  ],
};

export const projectMenu: SideMenuItem = {
  id: "projects",
  title: "Applications",
  icon: homeIcon,
  list: [
    // {
    //   id: "details",
    //   title: "Controls",
    //   icon: controlsIcon,
    //   parentId: "projects",
    // },
    {
      id: "localization",
      title: "Localization",
      icon: localizationIcon,
      parentId: "projects",
    },
    {
      id: "migration",
      title: "Migration",
      icon: migrationIcon,
      parentId: "projects",
    },
  ],
};

export const buildersMenu: SideMenuItem = {
  id: "builders",
  title: "Design Library",
  icon: designerIcon,
  list: [
    {
      id: "component",
      title: "Component",
      icon: componentIcon,
      parentId: "builders",
    },

    {
      id: "page",
      title: "Page",
      icon: pageIcon,
      parentId: "builders",
    },
  ],
};

export const playgroundMenu: SideMenuItem = {
  id: "playground",
  title: "AI Assistant",
  icon: aiAssistantIcon,
};

// const getMenuItem = (id: string) => {
//   switch (id) {
//     case "taxonomy":
//       return taxonomyMenu;
//     case "dashboards":
//       return dashboardsMenu;
//     case "solutions":
//       return solutionMenu;
//     case "workflows":
//       return workflowsMenu;
//     case "admin":
//       return adminMenu;
//     case "rules":
//       return rulesMenu;
//     case "connectors":
//       return connectorsMenu;
//     default:
//       break;
//   }
// };

const features = [
  { id: "taxonomy", name: "Taxonomy" },
  { id: "dashboards", name: "Dashboards" },
  { id: "solutions", name: "Solutions" },
  { id: "workflows", name: "Workflows" },
  { id: "rules", name: "Rules" },
  { id: "connectors", name: "Connectors" },
  { id: "admin", name: "Admin" },
];

const defualtMenu: SideMenuItem[] = [
  solutionMenu,
  projectMenu,
  companyMenu,
  taxonomyMenu,
  buildersMenu,
  dashboardsMenu,
  workflowsMenu,
  rulesMenu,
  connectorsMenu,
  // ...(isAiAssistantAllowed ? [playgroundMenu] : []),
];

const subject = new Subject();

const initialState: SideMenuStore = {
  colors: {
    mainMenuBgColor: "#550000",
    mainMenuHoverColor: "#EFC7BF",
    mainMenuHoverTextColor: "orange",
    mainMenuTextColor: "#ffffff",
    mainMenuActiveColor: "#EFC7BF", //"#1C75BC",
    subMenuBgColor: "#550000",
    subMenuTextColor: "#ffffff",
    subMenuHoverColor: "orange",
  },
  isMenuOpened: false,
  isSubMenuOpened: false,
  list: defualtMenu,
  selectedMenu: null,
  selectedSubMenu: undefined,
  features: features,
};

let state = initialState;

const sideMenuStore = {
  init: () => {
    state = { ...state };
    subject.next(state);
  },
  getState: () => subject.asObservable(),

  setMenuOpen: (open: boolean) => {
    state = {
      ...state,
      isMenuOpened: open,
    };
    subject.next(state);
  },
  getMenuOpen: () => {
    return state.isMenuOpened;
  },
  setSubMenuOpen: (open: boolean) => {
    state = {
      ...state,
      isSubMenuOpened: open,
    };
    subject.next(state);
  },
  getSubMenuOpen: () => {
    return state.isSubMenuOpened;
  },
  setSelectedMenu: (menuItem: SideMenuItem) => {
    // if (menuItem?.id === "workflows") {
    //   workFlowStore.enablePipelineFlag(false);
    // }
    state = {
      ...state,
      selectedMenu: menuItem,
    };
    subject.next(state);
  },
  getSelectedMenu: () => {
    return state.selectedMenu;
  },
  setSelectedSubMenu: (subMenuItem: SideMenuItem) => {
    // if (subMenuItem?.id === "aiPipelines") {
    //   workFlowStore.enablePipelineFlag(true);
    // }
    state = {
      ...state,
      selectedSubMenu: subMenuItem,
    };
    subject.next(state);
  },
  getSelectedSubMenu: () => {
    return state.selectedSubMenu;
  },
  // enableSubMenu: (open: boolean) => {
  //   state = {
  //     ...state,
  //     isSubmenuOpened: open,
  //   };
  //   subject.next(state);
  // },

  updateMenuList: (menuIds: any) => {
    state = {
      ...state,
      list: [...menuIds],
    };
    subject.next(state);
  },

  getDxPFeatures: () => {
    return state.features;
  },

  getWorkFlowMenu: () => {
    return workflowsMenu;
  },

  getDashBoardMenu: () => {
    return dashboardsMenu;
  },

  getAdminMenu: () => {
    return adminMenu;
  },

  getTaxonomyMenu: () => {
    return taxonomyMenu;
  },

  getRulesMenu: () => {
    return rulesMenu;
  },
  getConnectorMenu: () => {
    return connectorsMenu;
  },
  getPlaygroundMenu: () => {
    return playgroundMenu;
  },
  initialState,
};

export default sideMenuStore;
