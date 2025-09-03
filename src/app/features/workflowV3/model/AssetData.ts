export interface IAssetType {
    id: string;
    name: string;
    label: string;
}

export interface IAssetSubType {
    id: string;
    name: string;
    label: string;
    assetType: string;
}

export interface IPanelType {
  value: string;
  label: string;
  [key: string]: any;
}