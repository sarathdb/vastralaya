import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  useForm,
  FormProvider,
  useWatch,
  useFormContext,
} from "react-hook-form";
import { mockMetadataList } from "../../../mocks/mockMetaDataList";
import FormTransferList from "../../../forms/FormTransferList";

const Metadata = () => {
  const methods = useForm({
    defaultValues: {
      metaDataItems: [],
    },
  });

  const { handleSubmit, watch } = methods;

  const saveForm = handleSubmit((data) => {
    console.log("Form Data: ", data);
  });

  return (
    <Stack sx={{ p: 2, width: "100%" }}>
      <div>
        <h1>Restore</h1>
        <RestoreIcon style={{ color: "black", width: 32, height: 32 }} />
      </div>
      <FormProvider {...methods}>
        <Stack sx={{ mb: 2 }} direction="row" justifyContent="space-between">
          <Typography variant="h6">Metadata</Typography>
          <Button variant="contained" onClick={saveForm}>
            Save
          </Button>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Typography variant="h6" sx={{ pl: 2 }}>
            Metadata Configuration
          </Typography>
          <FormTransferList
            styles={{ height: 500, width: "100%" }}
            uniqueIdField={"metadataFieldId"}
            name={"metaDataItems"}
            initialItems={mockMetadataList}
            columns={[
              { name: "NAME", field: "name", width: "20%" },
              { name: "FORMAT", field: "format", width: "20%" },
              {
                name: "CATEGORY",
                field: "metadataFieldCategory",
                width: "30%",
              },
              {
                name: "DESCRIPTION",
                field: "description",
                width: "30%",
                align: "left",
              },
            ]}
          />
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default Metadata;

const RestoreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18"
    width="18"
    viewBox="0 0 24 24"
    stroke="#6A6A6A"
    strokeWidth="0.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="#6A6A6A"
    {...props}
  >
    <path d="M13 3a9 9 0 1 0 8.95 10.05h-2.02A7 7 0 1 1 12 5a6.9 6.9 0 0 1 4.24 1.46L14 9h7V2l-2.76 2.76A8.966 8.966 0 0 0 13 3z" />
  </svg>
);
