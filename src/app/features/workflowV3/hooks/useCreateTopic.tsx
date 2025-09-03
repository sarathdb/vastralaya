import { useCallback } from "react";

export const useCreateTopic = () => {
  const createTopicName = useCallback(
    (
      companyId: number,
      processorName: string,
      processorType: string,
      nodeId: string
    ): string => {
      return `${companyId}_${processorName}_${processorType}_${nodeId}`;
    },
    []
  );
  return createTopicName;
};
