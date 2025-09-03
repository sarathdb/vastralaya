import { FormTypes } from "../enum/FormTypes";
import { DefaultPanel } from "../rightPanel/panel/DefaultPanel";

import { ExecutionPanel } from "../rightPanel/panel/ExecutionPanel";

import { ProcessorPanel } from "../rightPanel/panel/processorPanel/ProcessorPanel";
import { TriggerPanel } from "../rightPanel/panel/TriggerPanel";
import { SwitchPanel } from "../rightPanel/panel/SwitchPanel";

export const formRegistry = {
  [FormTypes.Trigger]: TriggerPanel,
  [FormTypes.Processor]: ProcessorPanel,
  [FormTypes.Execution]: ExecutionPanel,
  [FormTypes.Disposition]: ProcessorPanel,
  [FormTypes.ExecuteRule]: ProcessorPanel,
  [FormTypes.UseAManage]: ProcessorPanel,
  [FormTypes.CreateException]: ProcessorPanel,
  [FormTypes.ContentManagement]: ProcessorPanel,
  [FormTypes.AiAgents]: DefaultPanel,
  [FormTypes.Apps]: DefaultPanel,
  [FormTypes.Flow]: DefaultPanel,
  [FormTypes.Rot]: DefaultPanel,
  [FormTypes.Default]: DefaultPanel,
  [FormTypes.Switch]: SwitchPanel,
};
