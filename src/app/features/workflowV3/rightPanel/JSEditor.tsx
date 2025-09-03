import MonacoEditor, { OnMount } from "@monaco-editor/react";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import * as monaco from "monaco-editor";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BorderedBox, { IconButtonConfig } from "./BorderBox";

interface IJSEditor {
  variableSuggestions?: string[];
  defaultJS: Record<string, any>;
  onSubmit?: (string) => void;
  isReadOnly?: boolean;
  error?: string;
  label: string;
  height: string;
}

const JSEditor: React.FC<IJSEditor> = ({
  label,
  variableSuggestions = [],
  defaultJS,
  onSubmit,
  height,
  isReadOnly,
  error,
}) => {
  const [jsInput, setJsInput] = useState<string>(
    JSON.stringify(defaultJS, null, 2)
  ); // Default empty JSON
  const [isEdit, toggleEdit] = useState<boolean>(true);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (isReadOnly) {
      setJsInput(JSON.stringify(defaultJS, null, 2));
      editorRef.current?.setValue(JSON.stringify(defaultJS, null, 2));
    }
  }, [defaultJS, isReadOnly]);

  useEffect(() => {
    editorRef.current?.updateOptions({ readOnly: isReadOnly });
  }, [isEdit, isReadOnly]);

  const handleEditorChange = (value: string | undefined) => {
    setJsInput(value || "");
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
    setJsInput(JSON.stringify(defaultJS, null, 2));
    editorRef.current?.setValue(JSON.stringify(defaultJS, null, 2));
  }, [defaultJS]);

  const handleEditToggle = useCallback(() => {
    toggleEdit((prev) => !prev);
    editorRef.current?.updateOptions({ readOnly: !isEdit });
  }, [isEdit]);

  const handleSubmit = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
      onSubmit(jsInput);
      handleEditToggle();
    }
  }, [handleEditToggle, jsInput, onSubmit]);

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
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
      <MonacoEditor
        height={height}
        defaultLanguage="javascript"
        value={jsInput}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        options={{ minimap: { enabled: false }, readOnly: isEdit }}
      />
    </BorderedBox>
  );
};

export default JSEditor;
