import MonacoEditor, { OnMount } from "@monaco-editor/react";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import * as monaco from "monaco-editor";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BorderedBox, { IconButtonConfig } from "./BorderBox";

interface IJsonEditor {
  variableSuggestions?: string[];
  defaultJson: Record<string, any>;
  onSubmit?: (string) => void;
  isReadOnly?: boolean;
  label: string;
  height: string;
}

const JsonEditor: React.FC<IJsonEditor> = ({
  label,
  variableSuggestions = [],
  defaultJson,
  onSubmit,
  height,
  isReadOnly,
}) => {
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(defaultJson, null, 2)
  ); // Default empty JSON
  const [isEdit, toggleEdit] = useState<boolean>(true);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    editorRef.current?.updateOptions({ readOnly: isReadOnly });
  }, [isEdit, isReadOnly]);

  const handleEditorChange = (value: string | undefined) => {
    setJsonInput(value || "");
  };

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoInstance.editor.setTheme("github-light");

    // Register completion provider for value suggestions
    monacoInstance.languages.registerCompletionItemProvider("json", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = new monacoInstance.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        );

        const suggestions: monaco.languages.CompletionItem[] =
          variableSuggestions.map((suggestion) => ({
            label: suggestion,
            kind: monacoInstance.languages.CompletionItemKind.Value,
            insertText: `"${suggestion}"`, // Auto-quote on insert
            range,
          }));

        return { suggestions };
      },
    });
  };

  const handleClear = useCallback(() => {
    setJsonInput(JSON.stringify(defaultJson, null, 2));
    editorRef.current?.setValue(JSON.stringify(defaultJson, null, 2));
  }, [defaultJson]);

  const handleEditToggle = useCallback(() => {
    toggleEdit((prev) => !prev);
    editorRef.current?.updateOptions({ readOnly: !isEdit });
  }, [isEdit]);

  const handleSubmit = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
      onSubmit(jsonInput);
      handleEditToggle();
    }
  }, [handleEditToggle, jsonInput, onSubmit]);

  const editorButtons = useMemo((): IconButtonConfig[] => {
    if (isReadOnly) {
      return [];
    }
    if (isEdit) {
      return [
        {
          iconLabel: "edit",
          tooltipText: "Edit input",
          onClick: handleEditToggle,
          icon: <EditIcon fontSize="small" />,
        },
      ];
    } else {
      return [
        {
          iconLabel: "submit",
          tooltipText: "Submit",
          onClick: handleSubmit,
          icon: <CheckIcon fontSize="small" />,
        },
        {
          iconLabel: "reset",
          tooltipText: "Reset",
          onClick: handleClear,
          icon: <ClearIcon fontSize="small" />,
        },
      ];
    }
  }, [handleClear, handleEditToggle, handleSubmit, isEdit, isReadOnly]);

  return (
    <BorderedBox title={label} iconButtons={editorButtons}>
      <MonacoEditor
        height={height}
        defaultLanguage="json"
        value={jsonInput}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        options={{ minimap: { enabled: false }, readOnly: isEdit }}
      />
    </BorderedBox>
  );
};

export default JsonEditor;
