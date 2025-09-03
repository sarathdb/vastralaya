import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldProps } from "../../model/Form.types";

const avatarStyle = [
  { backgroundColor: "#FFB6C1" },
  { backgroundColor: "#ADD8E6" },
  { backgroundColor: "#90EE90" },
  { backgroundColor: "#FFA07A" },
];

const FormAutoComplete: React.FC<FormFieldProps> = ({
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
      render={({ field }) => (
        <Autocomplete
          multiple
          freeSolo
          options={options}
          value={field.value}
          onChange={(e, value) => field.onChange(value)}
          sx={{
            "& .MuiFormLabel-root": {
              fontSize: "x-small", // Reduce label size when focused
            },
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={option}
                {...getTagProps({ index })}
                sx={{
                  ...avatarStyle[option.charCodeAt(0) % avatarStyle.length],
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label={label} />
          )}
        />
      )}
    />
  );
};

export default FormAutoComplete;
