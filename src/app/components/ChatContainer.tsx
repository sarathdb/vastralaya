import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ChatMessage from "./ChatMessage";

interface ChatContainerProps {
  userMessage?: string;
  responseData: any;
  loading?: boolean;
  error?: string | null;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  userMessage,
  responseData,
  loading = false,
  error = null,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formattedResponse = responseData
    ? JSON.stringify(responseData, null, 2)
    : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessage, formattedResponse, loading]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
            "&:hover": {
              background: "#555",
            },
          },
        }}
      >
        {userMessage && <ChatMessage isUser content={userMessage} />}
        <ChatMessage
          content={formattedResponse}
          loading={loading}
          error={error}
          textUpdateCallback={scrollToBottom}
        />
        <div ref={messagesEndRef} style={{ height: "20px" }} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
