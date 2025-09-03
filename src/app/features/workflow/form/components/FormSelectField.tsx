import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldProps } from "../form.types";

export const FormSelectField: React.FC<FormFieldProps> = ({
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
      render={({ field, fieldState }) => {
        // Find the selected option
        const fieldValue = field.value ?? "";
        const selectedOption = options.find(
          (option) => option.value === field.value
        );
        const hasDescription = !!selectedOption?.description;

        return (
          <TextField
            {...field}
            value={fieldValue} // Ensure it's always controlled
            select
            label={label}
            fullWidth
            disabled={disabled}
            onChange={(event) => field.onChange(event.target.value)}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{
              "& .MuiInputBase-root": {
                height: hasDescription ? 56 : 36, // Increase height when description exists
                display: "flex",
                alignItems: "center",
              },
              "& .MuiInputLabel-root": { top: "-6px", fontSize: "small" }, // Adjust label position
              "& .MuiInputLabel-shrink": { top: 0 }, // Keep label correct when focused
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box>
                  <Typography variant="body1" fontSize={"small"}>
                    {option.label}
                  </Typography>
                  {option.description && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontSize={"x-small"}
                    >
                      {option.description}
                    </Typography>
                  )}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};