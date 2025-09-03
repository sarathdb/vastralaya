import { Stack } from "@mui/material";
import React, { useCallback } from "react";
import { FormCheckbox } from "./components/FormCheckbox";
import { FormMultiSelectField } from "./components/FormMultiSelectField";
import { FormSelectField } from "./components/FormSelectField";
import { FormTextField } from "./components/FormTextField";
import { FormFieldProps } from "./form.types";
import { FormField } from "./formField.enum";

interface IFormParser {
  formData?: FormFieldProps[];
  fieldName: string;
}

const FormParser: React.FC<IFormParser> = ({ formData, fieldName }) => {
  const formFields = useCallback(
    (data: FormFieldProps) => {
      switch (data.fieldType) {
        case FormField.Text:
          return <FormTextField {...data} name={`${fieldName}.${data.name}`} />;
        case FormField.Select:
          return (
            <FormSelectField {...data} name={`${fieldName}.${data.name}`} />
          );
        case FormField.Checkbox:
          return <FormCheckbox {...data} name={`${fieldName}.${data.name}`} />;
        case FormField.Multiselect:
          return (
            <FormMultiSelectField
              {...data}
              name={`${fieldName}.${data.name}`}
            />
          );
      }
    },
    [fieldName]
  );
  if (formData == null || formData.length === 0) return null;
  return <Stack spacing={2}>{formData?.map((el) => formFields(el))}</Stack>;
};

export default FormParser;
