import React from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import TypewriterEffect from "./TypewriterEffect";

interface ChatMessageProps {
  isUser?: boolean;
  content: string | null;
  loading?: boolean;
  error?: string | null;
  textUpdateCallback?: (text: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  isUser = false,
  content,
  loading = false,
  error = null,
  textUpdateCallback,
}) => {
  // Don't render if there's no content and no loading/error state
  if (!content && !loading && !error) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
        mx: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          maxWidth: "70%",
          p: 2,
          backgroundColor: isUser ? "#007AFF" : "#f5f5f5",
          borderRadius: 2,
          position: "relative",
          wordBreak: "break-word",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography>Fetching data...</Typography>
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ fontFamily: "monospace" }}>
            {isUser ? (
              <Typography 
                sx={{ 
                  color: "white",
                  whiteSpace: "pre-wrap",
                }}
              >
                {content}
              </Typography>
            ) : (
              <TypewriterEffect
                text={content || ""}
                speed={50}
                duration={3000}
                textUpdateCallback={textUpdateCallback}
              />
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;
