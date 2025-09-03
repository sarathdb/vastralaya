import React from "react";

import {
  BaseRightPanel,
  IBaseRightPanel,
} from "../../../rightPanel/BaseRightPanel";
import { AssetSubType } from "../../../api/types";
import {
  Box,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { PropertyDisplay } from "./PropertyDisplay";
import { CheckList } from "./CheckList";

interface IAssetSubTypePanelProps extends IBaseRightPanel {
  assetSubType: any;
}

const assignedMetadataFields = [
  "Bank",
  "City",
  "Contact_Details",
  "Disciplinary_Actions",
  "Educational_Background",
];

export const AssetSubTypePanel: React.FC<IAssetSubTypePanelProps> = ({
  drawerOpen,
  onClose,
  assetSubType,
}) => {
  return (
    <BaseRightPanel
      drawerOpen={drawerOpen}
      onClose={onClose}
      label={assetSubType?.label}
      // onDelete={handleDelete}
      // loading={mediaCategoriesLoading && assetTypeCategoriesLoading}
    >
      <Stack sx={{ padding: 3 }} gap={2}>
        <Grid container spacing={2}>
          {/* Name & Label */}
          <Grid item xs={6}>
            <PropertyDisplay
              label="Name"
              value={assetSubType.name}
              divider={true}
            />
          </Grid>

          <Grid item xs={6}>
            <PropertyDisplay
              label="Label"
              value={assetSubType.label}
              divider={true}
            />
          </Grid>

          {/* LLM Prompt */}
          <Grid item xs={12} mt={2}>
            <PropertyDisplay
              label="LLM Prompt"
              value={assetSubType.llmPrompt}
            />
          </Grid>

          {/* Asset Type & Description */}
          <Grid item xs={6} mt={2}>
            <PropertyDisplay label="Asset Type" value={"assetTypeName"} />
          </Grid>
          <Grid item xs={6} mt={2}>
            <PropertyDisplay
              label="Description"
              value={assetSubType.description}
            />
          </Grid>
          <Grid item xs={6} mt={2}>
            <PropertyDisplay label="Category" value={assetSubType.type} />
          </Grid>

          {/* Assigned Items */}
          <Grid item xs={12} mt={2}>
            <CheckList
              title="Assigned Metadata Fields"
              items={assetSubType?.assetSubTypeMetadataFields?.map((f) => ({
                id: f.metadataFieldId,
                name: f.name,
              }))}
            />
          </Grid>

          <Grid item xs={12}>
            <CheckList
              title="Assigned Components"
              items={assetSubType?.uiComponents?.map((c) => ({
                id: c.componentConfigId,
                name: c.name,
              }))}
            />
          </Grid>

          <Grid item xs={12}>
            <CheckList
              title="Assigned Sub Types"
              items={assetSubType?.childrenAssetSubTypeDTOs?.map((s) => ({
                id: s.assetSubTypeId,
                name: s.name,
              }))}
            />
          </Grid>
        </Grid>
      </Stack>
    </BaseRightPanel>
  );
};
