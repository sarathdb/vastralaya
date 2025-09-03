import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import BorderedBox from "../../rightPanel/BorderBox";
import { FormJsonEditor } from "./FormJsonEditor";
import { FormSelectField } from "./FormSelectField";
import { FormTextField } from "./FormTextField";

export interface HttpRequestFormValues {
  method: "GET" | "POST" | "PUT" | "DELETE";
  requestUrl: string;
  authToken?: string;
  queryParams: { key: string; value: string }[];
  requestHeaders: { key: string; value: string }[];
  body?: object;
}

export const HttpRequestFormFields: React.FC<{ fieldName: string }> = ({
  fieldName,
}) => {
  const { control, watch } = useFormContext();

  const {
    fields: queryParams,
    append: addQueryParam,
    remove: removeQueryParam,
  } = useFieldArray({
    control,
    name: `${fieldName}.queryParams`,
  });

  const {
    fields: requestHeaders,
    append: addHeader,
    remove: removeHeader,
  } = useFieldArray({
    control,
    name: `${fieldName}.requestHeaders`,
  });

  const selectedMethod = watch(`${fieldName}.method`);

  return (
    <BorderedBox title="HTTP Request">
      {/* Request Type */}
      <FormSelectField
        name={`${fieldName}.method`}
        label="Request Type"
        options={[
          { label: "GET", value: "GET" },
          { label: "POST", value: "POST" },
          { label: "PUT", value: "PUT" },
          { label: "DELETE", value: "DELETE" },
        ]}
      />

      {/* Request URL */}
      <FormTextField
        name={`${fieldName}.requestUrl`}
        label="Request URL"
        rules={{ required: "URL is required" }}
      />

      {/* Auth Token */}
      <FormTextField
        name={`${fieldName}.authToken`}
        label="Auth Token (Optional)"
      />

      {/* Request Headers */}
      <Stack
        sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2 }}
      >
        <Typography variant="subtitle1">Request Headers</Typography>
        <Tooltip title="Add Header" placement="right">
          <IconButton
            size="small"
            onClick={() => addHeader({ key: "", value: "" })}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Stack>
      {requestHeaders.map((field, index) => (
        <Stack key={field.id} direction="row" spacing={1} alignItems="center">
          <FormTextField
            label="Key"
            name={`${fieldName}.requestHeaders.${index}.key`}
          />
          <FormTextField
            label="Value"
            name={`${fieldName}.requestHeaders.${index}.value`}
          />
          <Tooltip title="Delete Header" placement="right">
            <IconButton size="small" onClick={() => removeHeader(index)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}

      {/* Query Parameters */}
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">Query Parameters</Typography>
        <Tooltip title="Add Parameter" placement="right">
          <IconButton
            size="small"
            onClick={() => addQueryParam({ key: "", value: "" })}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Stack>
      {queryParams.map((field, index) => (
        <Stack key={field.id} direction="row" spacing={1} alignItems="center">
          <FormTextField
            label="Key"
            name={`${fieldName}.queryParams.${index}.key`}
          />
          <FormTextField
            label="Value"
            name={`${fieldName}.queryParams.${index}.value`}
          />
          <Tooltip title="Delete Parameter" placement="right">
            <IconButton size="small" onClick={() => removeQueryParam(index)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}

      {/* JSON Body (for POST/PUT only) */}
      {(selectedMethod === "POST" || selectedMethod === "PUT") && (
        <FormJsonEditor
          name={`${fieldName}.body`}
          label="Request Body (JSON)"
          jsonEditorHeight="200px"
        />
      )}
    </BorderedBox>
  );
};
