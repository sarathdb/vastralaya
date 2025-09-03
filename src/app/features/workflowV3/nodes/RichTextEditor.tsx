// RichTextEditor.tsx
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  height: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (quillRef.current) {
        quillRef.current.focus();
      }
    }, 100);
  }, []);
  return (
    <div
      style={{
        pointerEvents: "all",
        background: "#fff",
        padding: 8,
        borderRadius: 4,
        // minWidth: 200,
        // maxHeight: height,
      }}
    >
      <ReactQuill
        // className="custom-quill"
        onFocus={() => true}
        // style={{ height: height }}
        // onBlur={() => data.setDraggable?.(true)}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RichTextEditor;
