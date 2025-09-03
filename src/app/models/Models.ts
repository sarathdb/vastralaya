export interface ValidationRules {
  required?: string;
  disabled?: boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?:
    | ((value: any) => boolean | string)
    | Record<string, (value: any) => boolean | string>;
  valueAsNumber?: boolean;
  valueAsDate?: boolean;
  setValueAs?: (value: any) => any;
  deps?: string | string[];
  shouldUnregister?: boolean;
}

export interface IFormOptions {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode | string; // optional icon support for toggle buttons
  disabled?: boolean;
  ariaLabel?: string;
}

export interface FormFieldProps {
  name: string;
  fieldType?: string;
  label?: string;
  options?: IFormOptions[];
  isOptionLoading?: boolean;
  returnObjects?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  rules?: ValidationRules;
  jsonEditorVariableSuggestions?: string[];
  jsonEditorHeight?: string;
  isSearchEnabled?: boolean;
  searchFunction?: (searchTerm: string) => void;
  borderBoxIsCollapseActionShown?: boolean;
  borderBoxDefaultCollapsed?: boolean;
  allowCustomValue?: boolean;
  jsEditorVariableSuggestions?: string[];
  jsEditorHeight?: string;
  toggleExclusive?: boolean; // whether selection is exclusive
  toggleOrientation?: "horizontal" | "vertical"; // layout direction
}
