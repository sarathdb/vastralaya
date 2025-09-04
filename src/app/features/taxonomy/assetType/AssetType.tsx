import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { mockAssetTypes } from "../../../mocks/mockAssetTypes";
import Grid2 from "@mui/material/Grid2";
import { PanelTypes } from "../../../common/enums/panelTypes.enum";

import CreateSolution from "../../solutions/CreateSolution";
import { mockMediaCategories } from "../../../mocks/mockMediaCategories";
import { mockSolutionCategories } from "../../../mocks/mockSolutionCategories";
import { BaseRightPanel } from "../../../rightPanel/BaseRightPanel";

const AssetType = () => {
  const [openCreateSolution, setOpenCreateSolution] = useState(false);
  return (
    <Stack sx={{ p: 2 }}>
      {/* <Grid2 container spacing={2} >
        {mockAssetTypes.map((assetType) => (
          <Grid2 columnGap={12} key={assetType._id}>
            <Typography variant="h6">{assetType.type}</Typography>
          </Grid2>
        ))}
      </Grid2> */}

      <Stack sx={{ mb: 2 }} direction="row" justifyContent="space-between">
        <Typography variant="h6">Asset Type</Typography>
        <Button variant="contained" onClick={() => setOpenCreateSolution(true)}>
          Create Asset Type
        </Button>
      </Stack>

      <Grid2 container columns={12} spacing={1}>
        {mockAssetTypes?.map((assetType, index) => (
          <Grid2
            columnGap={3}
            key={assetType._id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              p: 1,
              backgroundColor: "white",
              width: "100%",
            }}
            onClick={() => {
              console.log("assetType", assetType);
              setOpenCreateSolution(true);
            }}
          >
            <Typography variant="h6">{assetType.type}</Typography>
          </Grid2>
        ))}
      </Grid2>
      <BaseRightPanel
        drawerOpen={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <CreateSolution
        open={openCreateSolution}
        solutionCategories={mockSolutionCategories}
        mediaCategories={mockMediaCategories}
        onCancel={() => setOpenCreateSolution(false)}
      />

      {/* <Grid2 container spacing={2} >
        {mockAssetTypes.map((assetType) => (
          <Grid2 columnGap={12} key={assetType._id}>
            <Typography variant="h6">{assetType.type}</Typography>
          </Grid2>
        ))}
      </Grid2> */}
      
    </Stack>
  );
};

export default AssetType;
