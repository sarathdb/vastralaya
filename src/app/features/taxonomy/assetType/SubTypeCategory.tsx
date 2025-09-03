import { Stack } from "@mui/material";
import React from "react";

interface ISubTypeCategoryProps {}

export const SubTypeCategory: React.FC<ISubTypeCategoryProps> = ({}) => (
  <>
    <Stack sx={{ backgroundColor: "orange", height: "100%", width: "100%" }}>
      <Stack sx={{ flexBasis: "10%", backgroundColor: "blue" }} />
      <Stack sx={{ flexBasis: "80%", backgroundColor: "red" }} />
      <Stack sx={{ flexBasis: "10%", backgroundColor: "green" }} />
    </Stack>
  </>
);
export default SubTypeCategory;
