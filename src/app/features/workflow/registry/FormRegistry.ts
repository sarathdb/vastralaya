import { FormTypes } from "../enum/FormTypes";
import { ProcessorPanel } from "../rightPanel/panel/ProcessorPanel";
import { TriggerPanel } from "../rightPanel/panel/TriggerPanel";
import { ExecutionPanel } from "../rightPanel/panel/ExecutionPanel";

export const formRegistry = {
  [FormTypes.Trigger]: TriggerPanel,
  [FormTypes.Processor]: ProcessorPanel,
  [FormTypes.Execution]: ExecutionPanel,
};
