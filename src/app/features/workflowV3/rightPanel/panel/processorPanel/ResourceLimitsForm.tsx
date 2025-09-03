import React, { useMemo } from "react";
import { FormTextField } from "../../../form/components/FormTextField";
import { ValidationRules } from "../../../form/form.types";

interface IResourceLimitsForm {
  field: string;
}

const ResourceLimitsForm: React.FC<IResourceLimitsForm> = ({ field }) => {
  const resourceLimitRule: ValidationRules = useMemo(() => {
    return {
      required: "Limit is required",
      pattern: {
        value: /^[0-9]*$/,
        message: "Please enter numbers only",
      },
      validate: {
        notEmpty: (value) => value.trim() !== "" || "Limit cannot be empty",
      },
    };
  }, []);

  return (
    <>
      <FormTextField
        name={`${field}.threshold`}
        label="Threshold"
        rules={resourceLimitRule}
      />
      <FormTextField
        name={`${field}.cpu`}
        label="CPU"
        rules={resourceLimitRule}
      />
      <FormTextField
        name={`${field}.memory`}
        label="Memory"
        rules={resourceLimitRule}
      />
    </>
  );
};

export default ResourceLimitsForm;
