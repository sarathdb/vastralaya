export interface ValidationRules {
  required?: string;
  disabled?: boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

export interface IFormOptions {
  label: string;
  value: string | number;
  description?: string;
}

export interface FormFieldProps {
  name: string;
  fieldType?: string;
  label: string;
  options?: IFormOptions[];
  disabled?: boolean;
  isRequired?: boolean;
  rules?: ValidationRules;
  jsonEditorVariableSuggestions?: string[];
  jsonEditorHeight?: string;
  jsEditorVariableSuggestions?: string[];
  jsEditorHeight?: string;
}
