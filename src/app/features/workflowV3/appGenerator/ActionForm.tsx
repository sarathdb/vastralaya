import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormFieldSpecForm from "./FormFieldSpecForm";

interface Props {
  fieldName: string;
}

const ActionForm: React.FC<Props> = ({ fieldName }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldName}`,
  });

  return (
    <Stack spacing={2}>
      <>
        {fields.map((field, index) => (
          <Stack
            key={field.id}
            spacing={2}
            sx={{ border: "1px solid #ddd", padding: 2, borderRadius: 2 }}
          >
            <FormFieldSpecForm fieldName={`${fieldName}.${index}`} />
            <Tooltip title={`Add parameter`} placement="right">
              <IconButton
                aria-label="deleteParameter"
                size="small"
                onClick={() => remove(index)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}

        <Tooltip title={`Add parameter`} placement="right">
          <IconButton
            aria-label="addParameter"
            size="small"
            onClick={() => append({ fieldType: "text", label: "", name: "" })}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </>
    </Stack>
  );
};

export default ActionForm;
