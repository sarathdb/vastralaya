import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import JsonEditor from "../../rightPanel/JsonEditor";
import { FormFieldProps } from "../form.types";

export const FormJsonEditor: React.FC<FormFieldProps> = ({
  name,
  label,
  rules,
  disabled,
  jsonEditorVariableSuggestions = [],
  jsonEditorHeight,
}) => {
  const { control, clearErrors, setError } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        validate: (value) => {
          if (!rules?.required && !value) {
            return true; // Skip validation if field is not required and empty
          }
          if (!value || typeof value !== "object") {
            return "Invalid JSON structure";
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <JsonEditor
          defaultJson={field.value ?? {}} // Ensure it's always an object
          variableSuggestions={jsonEditorVariableSuggestions} // Pass suggestions
          onSubmit={(newJsonString) => {
            try {
              const parsedJson = JSON.parse(newJsonString);
              field.onChange(parsedJson); // Store as object
              clearErrors(name); // Clear any existing errors
            } catch (error) {
              setError(name, {
                type: "manual",
                message: "Invalid JSON structure",
              });
            }
          }}
          label={label}
          height={jsonEditorHeight}
          isReadOnly={disabled}
          error={fieldState?.error?.message}
        />
      )}
    />
  );
};
