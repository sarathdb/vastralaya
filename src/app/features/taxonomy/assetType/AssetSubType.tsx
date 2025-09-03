import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { mockAssetSubTypes } from "../../../mocks/mockAssetSubTypes";
import Grid2 from "@mui/material/Grid2";
import { PanelTypes } from "../../../common/enums/panelTypes.enum";

import CreateSolution from "../../solutions/CreateSolution";
import { mockMediaCategories } from "../../../mocks/mockMediaCategories";
import { mockSolutionCategories } from "../../../mocks/mockSolutionCategories";
import { BaseRightPanel } from "../../../rightPanel/BaseRightPanel";
import { AssetSubTypePanel } from "./AssetSubTypePanel";

const AssetSubType = () => {
  const [openCreateSolution, setOpenCreateSolution] = useState(false);
  const [openAssetSubTypePanel, setOpenAssetSubTypePanel] = useState(false);
  return (
    <Stack sx={{ p: 2 }}>
      <Stack sx={{ mb: 2 }} direction="row" justifyContent="space-between">
        <Typography variant="h6">Asset Sub Type</Typography>
        <Button variant="contained" onClick={() => setOpenCreateSolution(true)}>
          Create Asset Sub Type
        </Button>
      </Stack>

      <Grid2 container columns={12} spacing={1}>
        {mockAssetSubTypes?.map((assetSubType, index) => (
          <Grid2
            columnGap={3}
            key={assetSubType._id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              p: 1,
              backgroundColor: "white",
              width: "100%",
            }}
            onClick={() => {
              console.log("assetSubType", assetSubType);
              //   setOpenCreateSolution(true);
              setOpenAssetSubTypePanel(true);
            }}
          >
            <Typography variant="h6">{assetSubType.name}</Typography>
          </Grid2>
        ))}
      </Grid2>

      <CreateSolution
        open={openCreateSolution}
        solutionCategories={mockSolutionCategories}
        mediaCategories={mockMediaCategories}
        onCancel={() => setOpenCreateSolution(false)}
      />
      <AssetSubTypePanel
        drawerOpen={openAssetSubTypePanel}
        onClose={() => setOpenAssetSubTypePanel(false)}
        assetSubType={mockAssetSubTypes[0]}
      />
    </Stack>
  );
};

export default AssetSubType;
