import Grid from "@mui/material/Grid2";
import * as React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box, Stack } from "@mui/material";

import { IFormOptions } from "../../models/Models";
import { FormTextField } from "../../forms/FormTextField";
import { FormSelectField } from "../../forms/FormSelectField";
import { FormMultiSelectField } from "../../forms/FormMultiSelectField";
import { FormCheckbox } from "../../forms/FormCheckbox";
import FormAutoComplete from "../../forms/FormAutoComplete";
const mediaCategories = [
  {
    id: 1,
    label: "Media Category 1",
    value: "Media Category 1 Description",
  },
  {
    id: 2,
    label: "Media Category 2",
    value: "Media Category 2 Description",
  },
];
const mockCategories = [
  {
    id: 1,
    label: "Category 1",
    value: "Category 1 Description",
  },
  {
    id: 2,
    label: "Category 2",
    value: "Category 2 Description",
  },
];

const mockUniqueTags = [
  { id: 1, label: "Tag1", value: "Tag1" },
  { id: 2, label: "Tag2", value: "Tag2" },
  { id: 3, label: "Tag3", value: "Tag3" },
];

const mockDefaultAssetViews = [
  { id: 1, label: "Asset View 1", value: "Asset View 1 Description" },
  { id: 2, label: "Asset View 2", value: "Asset View 2 Description" },
];

const mockDefaultLandingPages = [
  { id: 1, label: "Landing Page 1", value: "Landing Page 1 Description" },
  { id: 2, label: "Landing Page 2", value: "Landing Page 2 Description" },
];

const mockMediaCategories = [
  { id: 1, label: "Media Category 1", value: "Media Category 1 Description" },
  { id: 2, label: "Media Category 2", value: "Media Category 2 Description" },
];

const mockGenAIEmbedding = [
  { id: 1, label: "GenAIEmbedding 1", value: "GenAIEmbedding 1 Description" },
  { id: 2, label: "GenAIEmbedding 2", value: "GenAIEmbedding 2 Description" },
];

const mockGenAIDimensions = [
  { id: 1, label: "GenAIDimension 1", value: "GenAIDimension 1 Description" },
  { id: 2, label: "GenAIDimension 2", value: "GenAIDimension 2 Description" },
];

interface ICreateSolutionForm {
  solutionName?: string;
  categoryId: number[];
  description?: boolean;
}

interface ICreateProps {
  solution: Record<string, any>;
}

const CreateSolutionForm: React.FC<ICreateProps> = ({ solution }) => {
  // const { watch } = useFormContext();
  // const defaultForm = (solution as Partial<ICreateSolutionForm>) ?? {};

  // const methods = useForm<ICreateSolutionForm>({
  //   defaultValues: defaultForm,
  // });

  // const { handleSubmit } = methods;

  // const handleSave = handleSubmit(
  //   // Success callback - form is valid
  //   (data) => {},
  //   // Error callback - form has validation errors
  //   (errors) => {
  //     const errorMessage = `Form validation errors`;
  //   }
  // );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", height: "100%", overflowY: "auto" }}>
          {/* <FormProvider {...methods}> */}
          <Stack direction="column" spacing={2} p={2}>
            <Box>
              <FormTextField
                name="solutionName"
                label="Solution Name*"
                rules={{ required: "Solution name is mandatory" }}
              />
            </Box>

            <Box>
              <FormTextField name="label" label="Label" />
            </Box>

            <Box>
              <FormSelectField
                name="categoryId"
                label="Category*"
                options={mockCategories}
                rules={{ required: "true" }}
              />
            </Box>

            <Box>
              <FormTextField
                name="description"
                label="Description*"
                rules={{ required: "false" }}
              />
            </Box>
            <Box>
              <FormAutoComplete name="tags" label="Tags" />
            </Box>
            <Box>
              <FormSelectField
                name="defaultAssetView"
                label="Default Asset View"
                options={mockDefaultAssetViews}
              />
            </Box>
            <Box>
              <FormSelectField
                name="defaultLandingPage"
                label="Default Landing Page"
                options={mockDefaultLandingPages}
              />
            </Box>
            <Box>
              <FormSelectField
                name="mediaCategory"
                label="Media Category"
                options={mockMediaCategories}
              />
            </Box>
            <Box>
              <FormSelectField
                name="genAIEmbedding"
                label="GenAIEmbedding"
                options={mockGenAIEmbedding}
              />
            </Box>
            <Box>
              <FormSelectField
                name="genAIDimension"
                label="GenAIDimension"
                options={mockGenAIDimensions}
              />
            </Box>
            <Box>
              <FormCheckbox name="isDataPipeline" label="Data Pipeline" />
            </Box>
          </Stack>
          {/* </FormProvider> */}
        </Box>
      </Box>
    </>
  );
};
export default CreateSolutionForm;
