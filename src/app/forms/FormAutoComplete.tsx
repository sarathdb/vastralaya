import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { FormFieldProps } from "../models/Models";

const avatarStyle = [
  { backgroundColor: "#FFB6C1" },
  { backgroundColor: "#ADD8E6" },
  { backgroundColor: "#90EE90" },
  { backgroundColor: "#FFA07A" },
];

const uniqueTags = ["React", "JavaScript", "CSS", "HTML"];

const FormAutoComplete: React.FC<FormFieldProps> = ({
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
      render={({ field }) => (
        <Autocomplete
          multiple
          freeSolo
          options={uniqueTags}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
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
