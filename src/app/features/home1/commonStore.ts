import { Subject } from "rxjs";
import { Application, Company, SolutionConfig } from "../../api/types";

export interface DesignerUsers {
  platform_admin: boolean;
  platform_dev: boolean;
  application_admin: boolean;
  application_dev: boolean;
}

export interface CommonStore {
  application: Application;
  solution: SolutionConfig;
  placeHolder?: string;
  keyword?: string;
  platformApplication: Application;
  refreshRules: boolean;
  ruleEdit: boolean;
  dxpDesignerAdmin: boolean;
  dxpDesignerDeveloper: boolean;
  dxpImplManager: boolean;
  dxpSolArchitect: boolean;
  dxpSolDeveloper: boolean;
  soln_open: boolean;
  app_open: boolean;
  tempSolKey: string;
  tempAppDisplayName: string;
  language: string;
  companies: Company[];
  selectedCompany: Company;
  showCompanySelection: boolean;
  applications: Application[];
  userId: string;
  isPlatformAdmin: boolean;
}

const subject = new Subject();

const initialState: CommonStore = {
  application: null,
  solution: null,
  placeHolder: "Search",
  keyword: "",
  platformApplication: null,
  refreshRules: false,
  ruleEdit: false,
  soln_open: false,
  app_open: false,
  tempSolKey: "",
  tempAppDisplayName: "",
  language: sessionStorage.getItem("language") || "en-US",
  companies: [],
  selectedCompany: undefined,
  showCompanySelection: true,
  applications: [],
  dxpDesignerAdmin: false,
  dxpDesignerDeveloper: false,
  dxpImplManager: false,
  dxpSolArchitect: false,
  dxpSolDeveloper: false,
  userId: "",
  isPlatformAdmin: false,
};

let state = initialState;

const commonStore = {
  init: () => {
    state = { ...state };
    subject.next(state);
  },
  getState: () => subject.asObservable(),

  setApplication: (_application: Application) => {
    state = {
      ...state,
      application: _application,
    };
    subject.next(state);
  },
  setApplications: (_applications: Application[]) => {
    state = {
      ...state,
      applications: _applications,
    };
    subject.next(state);
  },
  getApplications: () => state.applications,
  getApplication: () => state.application,
  setSolution: (_solution: any) => {
    sessionStorage.setItem(
      "solutions",
      JSON.stringify([_solution?.solutionConfig?.solutionId ?? ""])
    );

    state = {
      ...state,
      solution: _solution,
    };
    subject.next(state);
  },
  getSolution: () => state.solution,
  setCompanies: (_companies: Company[]) => {
    state = {
      ...state,
      companies: _companies,
    };
    subject.next(state);
  },
  getCompanies: () => state.companies,
  setSelectedCompany: (_company: Company) => {
    state = {
      ...state,
      selectedCompany: _company,
    };
    subject.next(state);
  },
  getSelectedCompany: () => state.selectedCompany,
  setShowCompanySelection: (enable: boolean) => {
    state = {
      ...state,
      showCompanySelection: enable,
    };
    subject.next(state);
  },
  getShowCompanySelection: () => state.showCompanySelection,
  updateKeyword: (filterKey: string) => {
    state = {
      ...state,
      keyword: filterKey,
    };
    subject.next(state);
  },
  updatePlaceholder: (_placeHolder: string) => {
    state = {
      ...state,
      placeHolder: _placeHolder,
    };
    subject.next(state);
  },
  setPlatformApplication: (_application: Application) => {
    state = {
      ...state,
      platformApplication: _application,
    };
    subject.next(state);
  },
  getPlatformApplication: () => state.platformApplication,
  setRuleRefresh: (ruleRefreshed: boolean) => {
    state = {
      ...state,
      refreshRules: ruleRefreshed,
    };
    subject.next(state);
  },
  setRuleEdit: (ruleEdit: boolean) => {
    state = {
      ...state,
      ruleEdit: ruleEdit,
    };
    subject.next(state);
  },

  setUserGroups: (userGroups: any) => {
    if (userGroups) {
      state = {
        ...state,
        dxpDesignerAdmin: userGroups.indexOf("DXP Designer Admin") > -1,
      };
      subject.next(state);
    }
  },
  getUserGroups: () => {
    return {
      dxpDesignerAdmin: state.dxpDesignerAdmin,
      dxpDesignerDeveloper: state.dxpDesignerDeveloper,
      dxpImplManager: state.dxpImplManager,
      dxpSolArchitect: state.dxpSolArchitect,
      dxpSolDeveloper: state.dxpSolDeveloper,
    };
  },

  isAdmin: () => {
    return true;
  },
  isPlatformAdmin: () => {
    return state.isPlatformAdmin;
  },
  setIsPlatformAdmin: (isPlatformAdmin: boolean) => {
    state = {
      ...state,
      isPlatformAdmin: isPlatformAdmin,
    };
    subject.next(state);
  },
  isApplicationAdmin: () => {
    return true;
  },
  setSolutionAlertDialogue: (_open: boolean, _tempSolKey?: any) => {
    state = {
      ...state,
      soln_open: _open,
      tempSolKey: _tempSolKey,
    };
    subject.next(state);
  },
  getSolutionAlertDialogue: () => {
    return state.soln_open;
  },
  getApplicationAlertDialogue: () => {
    return state.app_open;
  },
  setApplicationAlertDialogue: (
    _open: boolean,
    _tempAppDisplayName?: string
  ) => {
    state = {
      ...state,
      app_open: _open,
      tempAppDisplayName: _tempAppDisplayName,
    };
    subject.next(state);
  },
  getTempAppDisplayName: () => {
    return state.tempAppDisplayName;
  },

  getTempSolKey: () => {
    return state.tempSolKey;
  },
  setLanguage: (applicationConfig) => {
    const language = applicationConfig?.locale || initialState.language;

    state = {
      ...state,
      language,
    };
    sessionStorage.setItem("language", language);
    subject.next(state);
  },
  getLanguage: () => {
    return sessionStorage.getItem("language") || state.language;
  },
  setUserId: (_userId: string) => {
    state = {
      ...state,
      userId: _userId,
    };
    subject.next(state);
  },
  getUserId: () => {
    return state.userId;
  },

  initialState,
};

export default commonStore;
