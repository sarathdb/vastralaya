export interface ValidationRules {
  required?: string;
  disabled?: boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

export interface FormFieldProps {
  name: string;
  label: string;
  options?: { label: string; value: string | number; description?: string }[];
  disabled?: boolean;
  rules?: ValidationRules;
}
