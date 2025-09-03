import { HttpRequestFormValues } from "../form/components/HttpRequestFormFields";
import { FormFieldProps } from "../form/form.types";

export interface ISpecFormValues {
  appName: string;
  appLabel: string;
  appIcon: string;
  templateType: string;
  form?: FormFieldProps[];
  formData?: HttpRequestFormValues;
}
