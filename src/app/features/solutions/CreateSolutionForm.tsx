import { Box, Stack } from "@mui/material";
import * as React from "react";
import FormAutoComplete from "../../common/components/formComponents/FormAutoComplete";
import { FormCheckbox } from "../../common/components/formComponents/FormCheckbox";
import { FormMultiSelectField } from "../../common/components/formComponents/FormMultiSelectField";
import { FormSelectField } from "../../common/components/formComponents/FormSelectField";
import { FormTextField } from "../../common/components/formComponents/FormTextField";
import { IMediaCategory } from "../../common/model/MediaCategory.types";
import { ISolutionCategory } from "../../common/model/SolutionCategory.types";
import { ISolution } from "../../common/model/Solution.types";
import { UseFormReturn } from "react-hook-form";

const defaultAssetViews = [
  { label: "LongCard", value: "1" },
  { label: "Thumbnail", value: "2" },
  { label: "Masonry", value: "3" },
];

const defaultLandingPages = [
  { label: "Dashboard", value: 1 },
  { label: "Task", value: 2 },
  { label: "AssetExplorer", value: "3" },
  { label: "Spaces", value: "4" },
  { label: "Solutions", value: "5" },
  { label: "Reports", value: "6" },
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

interface ICreateProps {
  methods: UseFormReturn<ISolution>;
  solutionCategories: ISolutionCategory[];
  mediaCategories: IMediaCategory[];
}

const CreateSolution: React.FC<ICreateProps> = ({
  solutionCategories,
  mediaCategories,
}) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", height: "100%", overflowY: "auto" }}>
          <Stack direction="column" spacing={2} p={2}>
            <Box>
              <FormTextField
                name="solutionName"
                label="Solution Name*"
                rules={{ required: "Solution name is required" }}
              />
            </Box>

            <Box>
              <FormTextField name="label" label="Label" />
            </Box>

            <Box>
              <FormSelectField
                name="categoryId"
                label="Category*"
                options={solutionCategories}
                rules={{ required: "Category is required" }}
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
                name="assetViewId"
                label="Default Asset View"
                options={defaultAssetViews}
              />
            </Box>
            <Box>
              <FormSelectField
                name="landingPageId"
                label="Default Landing Page"
                options={defaultLandingPages}
              />
            </Box>
            <Box>
              <FormMultiSelectField
                name="mediaCategory"
                label="Media Category"
                options={mediaCategories}
              />
            </Box>
            <Box>
              <FormSelectField
                name="genAIEmbedding"
                label="GenAIEmbedding"
                options={defaultGenAIEmbedding}
              />
            </Box>
            <Box>
              <FormSelectField
                name="genAIDimension"
                label="GenAIDimension"
                options={defaultGenAIDimension}
              />
            </Box>
            <Box>
              <FormCheckbox name="isDataPipeline" label="Data Pipeline" />
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default CreateSolution;
