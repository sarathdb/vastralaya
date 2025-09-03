import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import CreateSolution from "./CreateSolutionForm";
import {
  useForm,
  FormProvider,
  useWatch,
  useFormContext,
} from "react-hook-form";

// import {
//   CREATE_TAG,
//   GET_ALL_MATA_DATA_FIELD_TYPE,
//   CREATE_SOLUTION_CONFIG,
//   FETCH_ALL_ASSETS,
//   GET_ALL_ASSET_TYPE,
//   GET_ALL_ASSET_SUB_TYPE,
//   FETCH_ALL_RULE,
//   GET_ALL_GROUPS,
//   GET_ALL_PERMISSIONS,
//   GET_ALL_ROLES,
//   GET_ALL_WORKFLOW_ASSET,
//   FETCH_DATASOURCE,
//   PLATFORM_APPLICATION_KEY,
//   PLATFORM_SOLUTION_KEY,
//   GET_ALL_CATEGORIES,
//   FETCH_LTEST_SOLUTION_CONFIGS,
//   PLATFORM_COMPANY_ID,
//   FETCH_UNIQUE_TAGS,
//   FETCH_SOLUTION_DETAILS,
//   UPDATE_SOLUTION_CONFIG,
//   FETCH_ALL_ACTIONS,
//   FETCH_ALL_TASKTYPES,
//   GET_ALL_ASSETSTAGES,
// } from '../../api/apiEndPoints';

// import {
//   Application,
//   Asset,
//   AssetCategory,
//   AssetsReq,
//   Config,
//   SolutionConfig,
// } from '../../api/types';
// import commonStore, { CommonStore } from '../../home/commonStore';

// import { CloneStore, CloneType, defaultObj } from '../store';

// import useTranslation from '../../loaders/useTranslation';
// import locales from '../../../locale_designer.json';
// import CreateSolution from './createSolution';
// import ImportSolution from './importSolution';
// import cloneStore from '../store';
// import snackBarStore from '../../components/snackBarStore';
// import useAxios from '../../api/useAxios';
// import solutionBuilderStore from '../../solutionBuilder/solutionBuilderStore';
// import { parseSolution } from '../parser';
// import ImportMultiSolution from './ImportMultiSolution';
// import { getSolutionStatus } from '../../utils/getSolutonStatus';

// import { FETCH_SOLUTION_CATEGORIES } from '../../pgApi/EndPoints';

interface AppDialogProps {
  open: boolean;
  onClose: () => void;
}

const AppDialog = ({ open, onClose }: AppDialogProps) => {
  const methods = useForm({
    defaultValues: {
      solutionName: "",
      categoryId: 0,
      description: "",
      tags: [],
      label: "",
      defaultAssetView: "",
      defaultLandingPage: "",
      mediaCategory: "",
      genAIEmbedding: "",
      genAIDimension: "",
    },
  });
  const { handleSubmit, reset } = methods;
  const formContext = useFormContext();

  console.log("Form Context: ", formContext);

  //   const solutionName = useWatch({ formContext.control, name: "solutionName" });
  //   const categoryId = useWatch({ formContext.control, name: "categoryId" });

  const onSubmit = handleSubmit((data) => {
    console.log("Form Data: ", data);
    onClose();
  });

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "90%",
          minHeight: "90%",
          maxWidth: "90%",
          maxHeight: "90%",
          height: "90%",
        },
        backgroundColor: "transparent",
        outline: "none",
      }}
      open={true}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: 950,
        },
      }}
    >
      <FormProvider {...methods}>
        <DialogTitle
          sx={{
            color: "primary.main",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          Create
        </DialogTitle>

        <DialogContent
          sx={{
            padding: "16px",
            outline: "none",
            overflow: "hidden",
            display: "flex",
            flex: 1,
          }}
        >
          <CreateSolution solution={undefined} />
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "flex-start",
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "16px 24px",
          }}
        >
          <Button onClick={onClose} color="secondary">
            Reset
          </Button>

          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            // disabled={!solutionName || !categoryId}
          >
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AppDialog;
