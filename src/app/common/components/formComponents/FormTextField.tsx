import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldProps } from "../../model/Form.types";

export const FormTextField: React.FC<FormFieldProps> = ({
  name,
  label,
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
      render={({ field, fieldState }) => {
        const fieldValue = field.value ?? "";
        return (
          <TextField
            variant={"standard"}
            {...field}
            value={fieldValue} // Ensure it's always controlled
            label={label}
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            onChange={(event) => field.onChange(event.target.value)}
            placeholder={label}
            size="small" // This will make the TextField smaller
            sx={{
              "& .MuiInputBase-root": {
                height: 36, // Set height to 36px
                fontSize: "small",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "x-small", // Reduce placeholder size
                opacity: 0.6, // Optional: Make it slightly faded
              },
              "& .MuiFormLabel-root": {
                fontSize: "x-small", // Reduce label size when focused
              },
              "& .MuiInputLabel-shrink": {
                fontSize: "small",
                margin: 0,
                padding: 0,
              },
            }}
          />
        );
      }}
    />
  );
};
