import { PanelTypes } from '../common/enums/panelTypes.enum';
import { DefaultPanel } from '../rightPanel/panels/DefaultPanel';
import { AssetTypePanel } from '../rightPanel/panels/AssetTypePanel';
import { AssetSubTypePanel } from '../rightPanel/panels/AssetSubTypePanel';
import { MetaDataPanel } from '../rightPanel/panels/MetadataPanel';

export const panelRegistry = {
  [PanelTypes.Default]: DefaultPanel,
  [PanelTypes.AssetType]: AssetTypePanel,
  [PanelTypes.AssetSubType]: AssetSubTypePanel,
  [PanelTypes.MetaData]: MetaDataPanel,
};
