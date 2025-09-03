import { Drawer } from "@mui/material";
import React from "react";
import { Node } from "reactflow";
import { FormTypes } from "../enum/FormTypes";
import { IAssetSubType, IAssetType, INodeData } from "../model/NodeData";
import { formRegistry } from "../registry/FormRegistry";

export interface IBasePanel {
  drawerOpen: boolean;
  toggleOpen: () => void;
  node: Node<INodeData>;
  assetTypes: IAssetType[];
  assetSubTypes: IAssetSubType[];
  companyId: number;
  executionWorkflow: Record<string, any>;
  isReadOnly: boolean;
  switchNodes?: Node[];
}

const styles = {
  drawer: {
    width: "40%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
  },
};

export const BasePanel: React.FC<IBasePanel> = (props) => {
  const { drawerOpen, toggleOpen, node } = props;
  const Form = formRegistry[FormTypes.Switch];
  // props.isReadOnly
  //   ? formRegistry[FormTypes.Execution]
  //   : node.data.formType
  //   ? formRegistry[node.data.formType]
  //   : formRegistry["default"];

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleOpen}
      PaperProps={{ sx: styles.drawer }}
    >
      <Form {...props} />
    </Drawer>
  );
};
