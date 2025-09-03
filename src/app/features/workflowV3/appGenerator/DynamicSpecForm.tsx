import { Box, Stack, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import React, { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { FormSelectField } from "../form/components/FormSelectField";
import { FormTextField } from "../form/components/FormTextField";
import { HttpRequestFormFields } from "../form/components/HttpRequestFormFields";
import { IFormOptions } from "../form/form.types";
import { INodeCategory, INodeSubCategory } from "../model/NodeData";
import SvgRenderer from "../utils/SvgRenderer";
import ActionForm from "./ActionForm";
import { ISpecFormValues } from "./DynamicSpecForm.types";
import { mockSvgIcons } from "../mock/mockSvgIcons";

interface IDynamicSpecForm {
  nodeCategories: IFormOptions[];
  onGenerateSpec: (data: ISpecFormValues) => void;
  selectedCategory: INodeCategory;
  formSpec: INodeSubCategory;
}

const templateTypeOptions: IFormOptions[] = [
  { label: "Http Request", value: "http" },
  { label: "Processor", value: "processor" },
];

const DynamicSpecForm: React.FC<IDynamicSpecForm> = ({
  onGenerateSpec,
  formSpec,
}) => {
  const methods = useForm<ISpecFormValues>({
    defaultValues: {
      appName: formSpec?.nodeName,
      appLabel: formSpec.nodeLabel,
      appIcon: formSpec.nodeIcon,
      templateType: formSpec.templateType ?? "",
      form:  [],
      formData: formSpec.formData ?? {},
    },
  });

  const { handleSubmit, control, resetField, setValue, watch } = methods;

  const onSubmit = (data: ISpecFormValues) => {
    console.log("Generated Spec:", JSON.stringify(data, null, 2));
    onGenerateSpec(data);
  };

  const templateType = useWatch({ control, name: "templateType" });
  const appIcon = useWatch({ control, name: "appIcon" });
  const formValues = watch(); // Watch all form f

  useEffect(() => {
    if (templateType === "http") {
      resetField("form"); // Clear processor form fields
      setValue("formData", undefined); // Reset to empty object
    } else if (templateType === "processor") {
      resetField("formData"); // Clear HTTP request fields
      setValue("form", []); // Reset to empty array
    }
  }, [templateType, resetField, setValue]);

  useEffect(() => {
    const debouncedSubmit = debounce(() => {
      handleSubmit((data) => {
        console.log("Auto-submitting form:", JSON.stringify(data, null, 2));
        onGenerateSpec(data);
      })();
    }, 500); // Delay execution by 500ms

    debouncedSubmit();

    return () => debouncedSubmit.cancel();
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* App Name & Category */}
          <FormTextField label="App Name" name="appName" />
          <FormTextField label="App Label" name="appLabel" />
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            {/* <FormTextField label="App Icon" name="appIcon" /> */}
            <FormSelectField
              label="App Icon"
              name="appIcon"
              options={mockSvgIcons}
            />
            <SvgRenderer
              svg={appIcon}
              fontSize="large"
              color="primary"
              sx={{ width: 48, height: 48, objectFit: "contain" }}
            />
          </Stack>

          <FormSelectField
            label="Template Type"
            name="templateType"
            options={templateTypeOptions}
          />
          {/* Single Action */}

          {templateType.length > 0 && (
            <Stack spacing={2}>
              <Box
                sx={{
                  background: "white",
                  padding: "0 8px",
                  color: "#1e417a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography component="div" fontSize={"small"}>
                  {"Form Fields"}
                </Typography>
              </Box>
              {templateType === "processor" && <ActionForm fieldName="form" />}
              {templateType === "http" && (
                <HttpRequestFormFields fieldName="formData" />
              )}
            </Stack>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default DynamicSpecForm;
