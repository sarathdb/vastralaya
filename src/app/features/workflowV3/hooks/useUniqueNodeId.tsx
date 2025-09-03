import { useCallback } from "react";
import { Node } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

/**
 * Custom hook that provides a method to generate unique node IDs
 * @param nodes The current array of nodes
 * @returns An object containing the generateUniqueNodeId method
 */
export const useUniqueNodeId = (nodes: Node[]) => {
  /**
   * Generates a unique node ID that doesn't exist in the current nodes array
   * @returns A unique node ID string
   */
  const generateUniqueNodeId = useCallback((): string => {
    let newId = uuidv4();
    // Get current node IDs to check against
    const existingIds = nodes.map((node) => node.id);

    // Keep generating new IDs until we find one that doesn't exist
    while (existingIds.includes(newId)) {
      newId = uuidv4();
    }

    return newId;
  }, [nodes]);

  return { generateUniqueNodeId };
};
