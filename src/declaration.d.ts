declare module "*.png";
// declare module "*.svg";
declare module "*.gif";
declare module "*.html" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  import React from "react";
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
