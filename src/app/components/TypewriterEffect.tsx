import React, { useState, useEffect } from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TypewriterEffectProps {
  text: string; // The text to animate
  speed?: number; // Speed of typing in milliseconds
  duration?: number; // Duration in milliseconds before showing complete text
  textUpdateCallback?: (text: string) => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 50,
  duration = 5000,
  textUpdateCallback,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [showComplete, setShowComplete] = useState<boolean>(false);

  useEffect(() => {
    if (showComplete) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      textUpdateCallback?.(displayedText + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    // Set timer to show complete text after duration
    const timer = setTimeout(() => {
      clearInterval(interval);
      setShowComplete(true);
      setDisplayedText(text);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    }; // Cleanup interval and timer on unmount
  }, [text, speed, duration, showComplete]);

  return (
    <div>
      <ReactMarkDown
        className="stream-text"
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => (
            <table
              className="table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Vollkorn",
              }}
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="table-header"
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
                fontFamily: "Vollkorn",
              }}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="table-data"
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                fontFamily: "Vollkorn",
              }}
              {...props}
            />
          ),
        }}
      >
        {displayedText}
      </ReactMarkDown>
    </div>
  );
};

export default TypewriterEffect;
