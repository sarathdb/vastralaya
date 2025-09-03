import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  adminIcon,
  // aiAssistantIcon,
  aiDataIcon,
  assetSubTypeIcon,
  assetTypesIcon,
  componentIcon,
  connectorsIcon,
  dashboardIcon,
  designerIcon,
  // groupIcon,
  // homeIcon,
  // localizationIcon,
  metadataIcon,
  // migrationIcon,
  pageIcon,
  // permissionsIcon,
  rolesIcon,
  rulesIcon,
  solutionsIcon,
  taxonomyIcon,
  workflowIcon,
} from "../../assets";
import locales from "../localization/locale_designer.json";
// import { PLATFORM_SOLUTION_KEY } from "../api/apiEndPoints";
// import { Application, Company, SolutionConfig } from "../api/types";
// import commonStore from "../features/home1/commonStore";
import useTranslation from "../localization/useTranslation";
// import solutionBuilderStore from "../solutionBuilder/solutionBuilderStore";
// import { isAiAssistantAllowed } from "../utils/constants";
import sideMenuStore, {
  MenuColors,
  SideMenuItem,
  SideMenuStore,
} from "./sidemenuStore";

const drawerWidth = 260;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#550000",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SubMenu = ({
  //setSubMenu,
  open,
  //setOpen,
  list,
  active,
  menuColors,
}: any) => {
  const handleSubMenuClick = (value: any) => {
    console.log("value is **", value);
    sideMenuStore.setSelectedSubMenu(value);
    // sideMenuStore.setSubMenuOpen(false);
    // sideMenuStore.setMenuOpen(false);
    //setOpen(false);
  };

  return (
    <MuiDrawer
      anchor="left"
      hideBackdrop
      open={open}
      variant="persistent"
      onMouseLeave={() => {
        sideMenuStore.setSubMenuOpen(false);
        sideMenuStore.setMenuOpen(false);
      }}
      sx={{
        left: "65px",
        zIndex: 1199,
        flexShrink: 0,
        width: open ? "200px" : 0,
        "&::before": {
          display: open ? "block" : "none",
          content: `""`,
          backgroundColor: menuColors.subMenuBgColor,
          // backgroundColor: "green",
          height: "100%",
          width: "25px",
        },

        "& .MuiPaper-root": {
          boxSizing: "border-box",
          width: open ? "200px" : 0,
          boxShadow: "none",
          backgroundColor: menuColors.subMenuBgColor,
          color: menuColors.subMenuTextColor,
          // backgroundColor: "green",
          padding: "5px",
          left: "65px",
          borderRadius: "16px 0px 0px 16px",
        },
      }}
    >
      {/* <Typography sx={{ margin: 1 }}>{subMenu.title}</Typography> */}
      <List sx={{}} disablePadding>
        {list?.map((child: any, ckey: number) => (
          <ListItem
            key={ckey}
            disablePadding
            sx={{
              display: "block",
              overflow: "hidden",
              "&> .MuiListItemButton-root": {
                borderRadius: "25px",
                backgroundColor:
                  active?.title === child?.title
                    ? menuColors.subMenuHoverColor
                    : "",
                "&:hover": {
                  border: 1,
                  borderColor: menuColors.subMenuHoverColor,
                },
              },
            }}
          >
            <ListItemButton
              title={child.title}
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                backgroundColor: "purple",
              }}
              onClick={() => handleSubMenuClick(child)}
            >
              {/* <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 0.5,
                  justifyContent: "center",
                  backgroundColor:
                    active?.title === child?.title
                      ? menuColors.mainMenuActiveColor
                      : "",
                  padding: 0.75,
                  borderRadius: 24,
                }}
              >
                <img src={child.icon} alt={child.title} style={iconStyle} />
              </ListItemIcon> */}
              <ListItemText
                sx={{
                  maxWidth: "95%",
                  "& > .MuiTypography-body1": {
                    fontSize: "14px",
                  },
                  "& span": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                {child.title}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

const iconStyle = {
  filter: "brightness(0) invert(1)",
  height: "25px",
  width: "24px",
  "&:hover": {
    color: "#550000",
  },
};

const MainMenu = ({ open, index, value, active, menuColors }: any) => {
  const handleClick = (value: SideMenuItem) => {
    console.log("value iiss **", value);

    sideMenuStore.setSelectedMenu(value);
    // if (value?.id === "solutions") {
    //   solutionBuilderStore.setSelectedMenu({
    //     id: 11,
    //     title: "Explorer",
    //   });
    //   solutionBuilderStore.setSelectedView({
    //     id: 11,
    //     title: "Explorer",
    //   });
    // }

    if (value.list && value.list.length > 0) {
      sideMenuStore.setMenuOpen(false);
      sideMenuStore.setSubMenuOpen(true);
      const sub = sideMenuStore.getSelectedSubMenu();
      if (sub && sub?.parentId === value.id) {
        sideMenuStore.setSelectedSubMenu(sub);
      } else if ((sub && sub?.parentId !== value.id) || !sub) {
        sideMenuStore.setSelectedSubMenu(value.list[0]);
      }
    } else {
      sideMenuStore.setMenuOpen(true);
      sideMenuStore.setSubMenuOpen(false);
      sideMenuStore.setSelectedSubMenu(undefined);
    }
  };

  return (
    <ListItem
      key={index}
      disablePadding
      sx={{
        display: "block",
        "&> .MuiListItemButton-root": {
          borderRadius: "25px",
          margin: "16px 8px",
          backgroundColor:
            active?.title === value?.title
              ? menuColors.mainMenuActiveColor
              : "",
          boxSizing: "border-box",
          "&:hover": {
            backgroundColor: menuColors.mainMenuHoverColor,
            color: menuColors.mainMenuHoverTextColor,
          },
          color: menuColors.mainMenuHoverTextColor,
        },
      }}
    >
      <ListItemButton
        title={value?.title}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        onClick={() => handleClick(value)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            "&:hover": {
              // backgroundColor: menuColors.mainMenuHoverColor,
              color: menuColors.mainMenuHoverTextColor,
            },
          }}
        >
          <img src={value.icon} alt={value?.title} style={iconStyle} />
        </ListItemIcon>
        <ListItemText
          sx={{
            opacity: open ? 1 : 0,
            textIndent: 1,
            maxWidth: "95%",
            "& span": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
        >
          {value?.title}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

const LeftMenu = () => {
  const [menuOpen, setMenuOpen] = useState(sideMenuStore.getMenuOpen());
  const [subMenuOpen, setSubMenuOpen] = useState(
    sideMenuStore.getSubMenuOpen()
  );

  const [menuList, setMenuList] = useState<SideMenuItem[]>([]);
  const [menuColors, setMenuColors] = useState<MenuColors>(
    sideMenuStore.initialState.colors
  );
  const [selectedMenu, setSelectedMenu] = useState<any>(
    sideMenuStore.getSelectedMenu()
  );
  const [selectedSubMenu, setSelectedSubMenu] = useState<any>(
    sideMenuStore.getSelectedSubMenu()
  );

  // const [currentLanguage, setCurrentLanguage] = useState<any>(
  //   commonStore.getLanguage()
  // );
  // const [application, setApplication] = useState<Application>(
  //   commonStore.getApplication()
  // );

  // const [solution, setSolution] = useState<SolutionConfig>(
  //   commonStore.getSolution()
  // );
  // const [company, setCompany] = useState<Company>(
  //   commonStore.getSelectedCompany()
  // );

  const localeContent = locales;
  const translation = useTranslation(localeContent);
  // translation.setLanguage(currentLanguage);

  // const userInfo = sessionStorage.getItem("userInfo");
  // const { token } = JSON.parse(userInfo);
  // const decoded: any = jwt_decode(token);
  // const { insightUser } = decoded;
  // const { roles } = JSON.parse(insightUser);

  // const isPLatformAdmin: boolean = roles.includes("DXP Platform Admin");

  // useEffect(() => {
  //   const subscription = commonStore
  //     .getState()
  //     .subscribe((state: CommonStore) => {
  //       const { language, application, selectedCompany, solution } = state;
  //       if (language !== currentLanguage) {
  //         setCurrentLanguage(language);
  //       }
  //       setSolution(solution);
  //       setApplication(application);
  //       setCompany(selectedCompany);
  //     });
  //   return () => subscription.unsubscribe();
  // }, []);

  useEffect(() => {
    const menulistWithTranslation: SideMenuItem[] =
      getMenuListWithTranslation();

    setMenuList(menulistWithTranslation);
    sideMenuStore.updateMenuList([...menulistWithTranslation]);
    if (sideMenuStore.getSelectedMenu() === null)
      sideMenuStore.setSelectedMenu({ ...solutionMenu });
  }, []);

  const taxonomyMenu: SideMenuItem = {
    id: "taxonomy",
    title: translation["label.ui.taxonomy"],
    icon: taxonomyIcon,
    list: [
      {
        id: "assetType",
        title: translation["label.ui.asset.type"],
        icon: assetTypesIcon,
        parentId: "taxonomy",
      },
      {
        id: "assetSubType",
        title: translation["label.ui.asset.subtype"],
        icon: assetSubTypeIcon,
        parentId: "taxonomy",
      },
      {
        id: "classification",
        title: translation["label.ui.asset_subtype"],
        icon: assetSubTypeIcon,
        parentId: "taxonomy",
      },
      {
        id: "metadata",
        title: translation["label.ui.metadata"],
        icon: metadataIcon,
        parentId: "taxonomy",
      },
      {
        id: "subtypeCategory",
        title: translation["label.ui.subtype_category"],
        icon: metadataIcon,
        parentId: "taxonomy",
      },
    ],
  };

  const dashboardsMenu: SideMenuItem = {
    id: "dashboards",
    title: translation["label.ui.dashboards"],
    icon: dashboardIcon,
  };
  const solutionMenu: SideMenuItem = {
    id: "solutions",
    title: translation["label.ui.solutions"],
    icon: solutionsIcon,
  };
  const workflowsMenu: SideMenuItem = {
    id: "workflows",
    title: translation["label.ui.workflows"],
    icon: workflowIcon,
  };
  // const workflowsMenuV2: SideMenuItem = {
  //   id: "workflowsv2",
  //   title: "Workflows V2",
  //   icon: workflowIcon,
  // };
  // const workflowsMenuV3: SideMenuItem = {
  //   id: "workflowsv3",
  //   title: "Workflows V3",
  //   icon: workflowIcon,
  // };
  const rulesMenu: SideMenuItem = {
    id: "rules",
    title: translation["label.ui.rules"],
    icon: rulesIcon,
    list: [
      {
        id: "action",
        title: translation["label.ui.action"],
        icon: rulesIcon,
        parentId: "rules",
      },
      {
        id: "exceptionType",
        title: translation["label.ui.task_type_exception_type"],
        icon: rulesIcon,
        parentId: "rules",
      },
      {
        id: "rulesLibrary",
        title: translation["label.ui.rules.library"],
        icon: rulesIcon,
        parentId: "rules",
      },
    ],
  };
  const connectorsMenu: SideMenuItem = {
    id: "connectors",
    title: translation["label.ui.connectors"],
    icon: connectorsIcon,
  };

  const adminMenu: SideMenuItem = {
    id: "admin",
    title: translation["label.ui.administration"],
    icon: adminIcon,
    list: [],
  };

  // const platformAdminMenu: SideMenuItem = {
  //   id: "admin",
  //   title: translation["label.ui.administration"],
  //   icon: adminIcon,
  //   list: [
  //     {
  //       id: "users",
  //       title: translation["label.ui.designerUsers"],
  //       icon: connectorsIcon,
  //     },
  //     {
  //       id: "designerGroups",
  //       title: translation["label.ui.designerGroups"],
  //       icon: groupIcon,
  //       parentId: "admin",
  //     },
  //   ],
  // };
  // const projectMenu: SideMenuItem = {
  //   id: "projects",
  //   title: translation["label.ui.applications"],
  //   icon: homeIcon,
  //   list: [
  //     // {
  //     //   id: "details",
  //     //   title: translation["label.ui.controls"],
  //     //   icon: controlsIcon,
  //     //   parentId: "projects",
  //     // },
  //     {
  //       id: "localization",
  //       title: translation["label.ui.localization"],
  //       icon: localizationIcon,
  //       parentId: "projects",
  //     },
  //   ],
  // };

  const buildersMenu: SideMenuItem = {
    id: "builders",
    title: translation["label.ui.design_library"],
    icon: designerIcon,
    list: [
      {
        id: "component",
        title: translation["label.ui.component"],
        icon: componentIcon,
        parentId: "builders",
      },

      {
        id: "page",
        title: translation["label.ui.page"],
        icon: pageIcon,
        parentId: "builders",
      },
    ],
  };

  // const playgroundMenu: SideMenuItem = {
  //   id: "playground",
  //   title: translation["label.ui.ai_assistant"],
  //   icon: aiAssistantIcon,
  // };

  const rolesMenu: SideMenuItem = {
    id: "roles",
    title: translation["label.ui.roles"],
    icon: rolesIcon,
  };
  const dataExplorer: SideMenuItem = {
    id: "dataExplorer",
    title: translation["label.ui.dataExplorer"],
    icon: solutionsIcon,
  };
  const dataConnectors: SideMenuItem = {
    id: "dataConnectors",
    title: translation["label.ui.dataConnectors"],
    icon: solutionsIcon,
  };
  const aiConnectors: SideMenuItem = {
    id: "aiConnectors",
    title: translation["label.ui.aiConnectors"],
    icon: solutionsIcon,
  };
  const aiJobs: SideMenuItem = {
    id: "aiJobs",
    title: translation["label.ui.aiJobs"],
    icon: solutionsIcon,
  };
  const aiPipelines: SideMenuItem = {
    id: "aiPipelines",
    title: translation["label.ui.aiPipelines"],
    icon: solutionsIcon,
  };
  const aiData: SideMenuItem = {
    id: "aiData",
    title: translation["label.ui.aiData"],
    icon: aiDataIcon,
    list: [
      { ...dataExplorer },
      { ...dataConnectors },
      { ...aiConnectors },
      { ...aiPipelines },
      { ...aiJobs },
    ],
  };

  // const isV2Shown = () => {
  //   const emails = [
  //     "raghavender.reddy@ironmountain.com",
  //     "shashank.shivhare@ironmountain.com",
  //     "shyamsunder.shanmugam@ironmountain.com",
  //     "sarathbabu.dakoji@ironmountain.com",
  //     "aditya.vig@ironmountain.com",
  //   ];
  //   const userInfo = sessionStorage.getItem("userInfo");
  //   const { userId } = JSON.parse(userInfo);
  //   if (emails.includes(userId)) {
  //     return true;
  //   }
  //   return false;
  // };

  function getMenuListWithTranslation() {
    let admin = adminMenu;

    admin = {
      ...adminMenu,
      list: [
        ...admin.list,
        // ...(company?.companyId === 0 && isPLatformAdmin
        //   ? [...platformAdminMenu.list]
        //   : []),
        // ...(company?.companyId === 0
        //   ? [
        //       {
        //         id: "companies",
        //         title: translation["label.ui.company"],
        //         icon: connectorsIcon,
        //       },
        //     ]
        //   : []),
        // ...(company?.companyId === 0 &&
        // solution.solutionKey === PLATFORM_SOLUTION_KEY
        //   ? [
        //       {
        //         id: "permissions",
        //         title: translation["label.ui.permissions"],
        //         icon: permissionsIcon,
        //         parentId: "admin",
        //       },
        //     ]
        //   : []),
      ],
    };

    // let applicationMenu = {
    //   ...projectMenu,
    //   list: [
    //     // is admin and company 0 show localization
    //     ...(isPLatformAdmin && company?.companyId === 0
    //       ? projectMenu.list
    //       : []),
    //     // is admin then show migration
    //     ...(isPLatformAdmin
    //       ? [
    //           {
    //             id: "migration",
    //             title: translation["label.ui.migration"],
    //             icon: migrationIcon,
    //             parentId: "projects",
    //           },
    //         ]
    //       : []),
    //   ],
    // };

    // const defualtMenu: SideMenuItem[] = [
    //   solutionMenu,
    //   // ...(isPLatformAdmin ? [applicationMenu] : []),
    //   taxonomyMenu,
    //   buildersMenu,
    //   dashboardsMenu,
    //   workflowsMenu,
    //   ...(isV2Shown() ? [workflowsMenuV2] : []),
    //   ...(isV2Shown() ? [workflowsMenuV3] : []),
    //   rulesMenu,
    //   connectorsMenu,
    //   rolesMenu,
    //   // ...(isAiAssistantAllowed ? [playgroundMenu] : []),

    //   aiData,
    //   admin,
    // ];
    const defualtSolMenu: SideMenuItem[] = [
      solutionMenu,
      // ...(isPLatformAdmin ? [applicationMenu] : []),
      taxonomyMenu,
      buildersMenu,
      dashboardsMenu,
      workflowsMenu,
      // ...(isV2Shown() ? [workflowsMenuV2] : []),
      // ...(isV2Shown() ? [workflowsMenuV3] : []),
      rulesMenu,
      connectorsMenu,
      rolesMenu,
      aiData,
      // ...(isAiAssistantAllowed ? [playgroundMenu] : []),
    ];

    // if (company?.companyId === 0) return defualtMenu;
    return defualtSolMenu;
  }
  // const [showSubMenu, setShowSubMenu] = useState(false);
  // const [activeMain, setActiveMain] = useState<any>();
  // const [activeSub, setActiveSub] = useState<any>();

  useEffect(() => {
    const subscription = sideMenuStore
      .getState()
      .subscribe((state: SideMenuStore) => {
        setSelectedMenu(state.selectedMenu);
        setSelectedSubMenu(state.selectedSubMenu);
        setMenuList(state.list);
        setMenuColors(state.colors);
        setMenuOpen(state.isMenuOpened);
        setSubMenuOpen(state.isSubMenuOpened);
      });
    return () => subscription.unsubscribe();
  }, []);

  const handleDrawerOpen = () => {
    const main = sideMenuStore.getSelectedMenu();
    if (main && main.list && main.list.length > 0) {
      sideMenuStore.setSubMenuOpen(true);
      sideMenuStore.setMenuOpen(false);
    } else {
      sideMenuStore.setMenuOpen(true);
    }
  };
  const handleDrawerCLose = () => {
    sideMenuStore.setMenuOpen(false);
  };
  console.log("Menu List is ====>", menuList);

  return (
    <div style={{ flexDirection: "row", display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        open={menuOpen}
        sx={{
          "& .MuiPaper-root ": {
            backgroundColor: menuColors.mainMenuBgColor,
            color: menuColors.mainMenuTextColor,
            border: 0,
          },
        }}
      >
        <List onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerCLose}>
          {menuList.map((value, key) => {
            return (
              <MainMenu
                key={key}
                value={value}
                index={key}
                open={menuOpen}
                active={selectedMenu}
                setSubMenu={selectedSubMenu}
                menuColors={menuColors}
              />
            );
          })}
        </List>
      </Drawer>
      {selectedMenu?.list?.length > 0 && (
        <SubMenu
          open={subMenuOpen}
          list={selectedMenu?.list}
          active={selectedSubMenu}
          menuColors={menuColors}
        />
      )}
    </div>
  );
};
export default LeftMenu;
