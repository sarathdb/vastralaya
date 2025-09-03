import { Stack, Typography } from "@mui/material";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormSelectField } from "../form/components/FormSelectField";
import { FormTextField } from "../form/components/FormTextField";
import { IFormOptions } from "../form/form.types";
import { FormField } from "../form/formField.enum";
import { FormOptionsField } from "./FormOptionsField";

interface Props {
  fieldName: string;
}

const fieldTypes: IFormOptions[] = [
  {
    value: FormField.Text,
    label: "Text",
  },
  {
    value: FormField.Select,
    label: "Select",
  },
  {
    value: FormField.Checkbox,
    label: "Checkbox",
  },
];

const FormFieldSpecForm: React.FC<Props> = ({ fieldName }) => {
  const { control } = useFormContext();
  const fieldType = useWatch({ control, name: `${fieldName}.fieldType` });

  return (
    <Stack spacing={2}>
      <FormSelectField
        name={`${fieldName}.fieldType`}
        label="Field Type"
        options={fieldTypes}
      />

      <FormTextField label="Label Name" name={`${fieldName}.label`} />
      <FormTextField label="Field Name" name={`${fieldName}.name`} />
      {fieldType === "select" && (
        <>
          <Typography variant="subtitle2">
            Options (Only for Select Fields)
          </Typography>
          <FormOptionsField fieldName={`${fieldName}.options`} />
        </>
      )}
    </Stack>
  );
};

export default FormFieldSpecForm;
