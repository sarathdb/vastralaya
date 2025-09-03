// RichTextViewer.tsx
import React from 'react';

interface RichTextViewerProps {
  htmlContent: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ htmlContent }) => {
  return (
    <div
      style={{ border: '1px solid #ccc', padding: 10 }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default RichTextViewer;
