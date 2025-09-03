import { MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldProps } from "../form.types";

export const FormMultiSelectField: React.FC<FormFieldProps> = ({
  name,
  label,
  options = [],
  rules,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          SelectProps={{ multiple: true }}
          // Ensure field.value is never null or undefined, set it as an empty array if needed
          value={field.value ?? []} // Default to empty array if null or undefined
          onChange={(event) => field.onChange(event.target.value)}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="standard"
          sx={{
            "& .MuiInputBase-root": {
              height: 36, // Increase height when description exists
              display: "flex",
              alignItems: "center",
            },
            "& .MuiInputLabel-root": { top: "-6px", fontSize: "small" }, // Adjust label position
            "& .MuiInputLabel-shrink": { top: 0 }, // Keep label correct when focused
            "& .MuiInputBase-input": { display: "ruby" },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Typography variant="body1" fontSize={"small"}>
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
