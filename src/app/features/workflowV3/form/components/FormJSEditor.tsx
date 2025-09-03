import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldProps } from "../form.types";
import JSEditor from "../../rightPanel/JSEditor";

export const FormJSEditor: React.FC<FormFieldProps> = ({
  name,
  label,
  rules,
  disabled,
  jsEditorVariableSuggestions = [],
  jsEditorHeight,
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
            return "Invalid JS structure";
          }
          return true;
        },
      }}
      render={({ field, fieldState }) => (
        <JSEditor
          defaultJS={field.value ?? {}} // Ensure it's always an object
          variableSuggestions={jsEditorVariableSuggestions} // Pass suggestions
          onSubmit={(newJSString) => {
            try {
              const parsedJS = JSON.parse(newJSString);
              field.onChange(parsedJS); // Store as object
              clearErrors(name); // Clear any existing errors
            } catch (error) {
              setError(name, {
                type: "manual",
                message: "Invalid JS structure",
              });
            }
          }}
          label={label}
          height={jsEditorHeight}
          isReadOnly={disabled}
          error={fieldState?.error?.message}
        />
      )}
    />
  );
};
