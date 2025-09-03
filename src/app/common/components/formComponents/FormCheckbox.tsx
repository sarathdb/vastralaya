import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldProps } from '../../model/Form.types';

export const FormCheckbox: React.FC<FormFieldProps> = ({
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
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value ?? false} // Default to false if null or undefined
              onChange={(event) => field.onChange(event.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
};
