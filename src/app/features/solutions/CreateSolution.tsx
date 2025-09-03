import React, { useCallback, useMemo, useState } from "react";
import { AppDialogBase } from "../../common/components/dialogs/AppDialogBase";
import { ISolutionCategory } from "../../common/model/SolutionCategory.types";
import { IMediaCategory } from "../../common/model/MediaCategory.types";
import { ISolution } from "../../common/model/Solution.types";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";
import { IStyles } from "../workflowV3/model/IStyles";
import FormAutoComplete from "../../forms/FormAutoComplete";
import { FormCheckbox } from "../../forms/FormCheckbox";
import { FormMultiSelectField } from "../../forms/FormMultiSelectField";
import { FormSelectField } from "../../forms/FormSelectField";
import { FormTextField } from "../../forms/FormTextField";

export interface ICreateSolutionProps {
  open: boolean;
  solutionCategories: ISolutionCategory[];
  mediaCategories: IMediaCategory[];
  onCancel: () => void;
}

const defaultAssetViews = [
  { label: "LongCard", value: "1" },
  { label: "Thumbnail", value: "2" },
  { label: "Masonry", value: "3" },
];

const defaultLandingPages = [
  { label: "Dashboard", value: 1 },
  { label: "Task", value: 2 },
  { label: "AssetExplorer", value: 3 },
  { label: "Spaces", value: 4 },
  { label: "Solutions", value: 5 },
  { label: "Reports", value: 6 },
];

const defaultGenAIEmbedding = [
  {
    label: "amazon.titan-embed-text-v2:0",
    value: "amazon.titan-embed-text-v2:0",
  },
  { label: "openai-ada-002", value: "openai-ada-002" },
];

const defaultGenAIDimension = [
  { label: "256", value: "256" },
  { label: "512", value: "512" },
  { label: "1024", value: "1024" },
];

const styles: IStyles = {
  titleContainer: { alignItems: "center", flexDirection: "row", gap: 1 },
  createSolutionTitle: {
    fontWeight: 400,
    textTransform: "capitalize",
  },
  formContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  commonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
};
const CreateSolution: React.FC<ICreateSolutionProps> = ({
  open,
  solutionCategories,
  mediaCategories,
  onCancel,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const defaultStyles = useMemo(() => styles, []);

  const methods = useForm<ISolution>({
    // Add this to ensure values are available immediately
    mode: "onChange",
  });
  const { reset, handleSubmit } = methods;

  const handleSaveWithValidation = () => {
    return handleSubmit(
      // Success callback
      (data) => {
        setValidationError(null);
        onSubmit(data);
        return true;
      },
      (errors) => {
        setValidationError("Form validation errors");
        return false;
      }
    )();
  };

  const onSubmit = useCallback((form: ISolution) => {
    console.log("form is", form);
  }, []);

  return (
    <AppDialogBase
      onCancel={onCancel}
      //   onUpdate={handleSaveWithValidation}
      onSave={handleSaveWithValidation}
      isLoading={false}
      errorMessage={validationError}
      isOpen={open}
      isSaveEnabled={true}
      //   isUpdateEnabled={false}
      //   isDeleteEnabled={false}
      titleComponent={
        <>
          <Stack sx={defaultStyles.titleContainer}>
            <Typography
              color={"primary.main"}
              sx={defaultStyles.createSolutionTitle}
              noWrap
            >
              {`Create Solution`}
            </Typography>
          </Stack>
        </>
      }
      contentComponent={
        <>
          <Box sx={defaultStyles.formContainer}>
            <FormProvider {...methods}>
              <Stack
                direction="column"
                spacing={2}
                p={2}
                sx={{ width: "100%", height: "100%" }}
              >
                <FormTextField
                  name="solutionName"
                  label="Solution Name*"
                  rules={{ required: "Solution name is required" }}
                />

                <FormTextField name="label" label="Label" />

                <FormSelectField
                  name="categoryId"
                  label="Category*"
                  options={solutionCategories}
                  rules={{ required: "Category is required" }}
                />

                <FormTextField
                  name="description"
                  label="Description*"
                  rules={{ required: "false" }}
                />

                <FormAutoComplete name="tags" label="Tags" />

                <FormSelectField
                  name="assetViewId"
                  label="Default Asset View"
                  options={defaultAssetViews}
                />

                <FormSelectField
                  name="landingPageId"
                  label="Default Landing Page"
                  options={defaultLandingPages}
                />

                <FormMultiSelectField
                  name="mediaCategory"
                  label="Media Category"
                  options={mediaCategories}
                />

                <FormSelectField
                  name="genAIEmbedding"
                  label="GenAIEmbedding"
                  options={defaultGenAIEmbedding}
                />

                <FormSelectField
                  name="genAIDimension"
                  label="GenAIDimension"
                  options={defaultGenAIDimension}
                />

                <FormCheckbox name="isDataPipeline" label="Data Pipeline" />
              </Stack>
            </FormProvider>
          </Box>
        </>
      }
    />
  );
};

export default CreateSolution;
