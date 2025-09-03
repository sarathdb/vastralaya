import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormTextField } from "../form/components/FormTextField";

interface FormOptionsFieldProps {
  fieldName: string;
}

export const FormOptionsField: React.FC<FormOptionsFieldProps> = ({
  fieldName,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName, // Stores options as an array in the form state
  });

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Options</Typography>
      {fields.map((option, index) => (
        <Stack key={option.id} direction="row" spacing={1} alignItems="center">
          {/* Label Input */}
          <FormTextField label="Label" name={`${fieldName}.${index}.label`} />
          {/* Value Input */}
          <FormTextField label="Value" name={`${fieldName}.${index}.value`} />
          {/* Remove Option Button */}
          <Tooltip title={`Add parameter`} placement="right">
            <IconButton
              aria-label="deleteParameter"
              size="small"
              onClick={() => remove(index)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}

      {/* Add New Option Button */}
      <Button
        variant="contained"
        onClick={() => append({ label: "", value: "" })}
      >
        Add Option
      </Button>
    </Stack>
  );
};
