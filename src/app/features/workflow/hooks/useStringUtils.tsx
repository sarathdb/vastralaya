import { useCallback } from "react";

/**
 * Custom hook that provides string cleaning utilities
 * @returns Object containing string utility functions
 */
export const useStringUtils = () => {
  /**
   * Removes special characters and spaces from a string
   * @param input - The string to clean
   * @param options - Configuration options
   * @returns The cleaned string
   */
  const removeSpecialCharsAndSpaces = useCallback(
    (
      input: string,
      options: {
        preserveNumbers?: boolean;
        preserveUnderscore?: boolean;
        preserveHyphen?: boolean;
      } = {}
    ) => {
      if (!input) return "";

      const {
        preserveNumbers = true,
        preserveUnderscore = true,
        preserveHyphen = true,
      } = options;

      let pattern = "[^a-zA-Z";

      // Add optional character preservations to the regex pattern
      if (preserveNumbers) pattern += "0-9";
      if (preserveUnderscore) pattern += "_";
      if (preserveHyphen) pattern += "-";

      pattern += "]";

      // Create RegExp from pattern and replace matches with empty string
      const regex = new RegExp(pattern, "g");
      return input.replace(regex, "").replace(/\s+/g, "");
    },
    []
  );

  return {
    removeSpecialCharsAndSpaces,
  };
};
