import React, { useState } from "react";
import { Container, TextField, IconButton, Paper, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getContinents } from "../../services/api";
import useAxios from "../../hooks/useAxios";
import ChatContainer from "../../components/ChatContainer";

interface Continent {
  id: number;
  name: string;
}

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");

  const {
    data: continents,
    loading,
    error,
    fetchData: fetchContinents,
  } = useAxios<Continent[]>(getContinents);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setUserMessage(message);
      try {
        await fetchContinents();
      } catch (error) {
        console.error("Error fetching continents:", error);
      }
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 90px)", // Subtract AppHeader height //64
        // marginTop: "64px", // Add AppHeader height as margin
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: "16px !important",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            mb: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <ChatContainer
            userMessage={userMessage}
            responseData={continents}
            loading={loading}
            error={error}
          />
        </Paper>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={3}
          sx={{
            p: 2,
            display: "flex",
            gap: 2,
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <IconButton
            type="submit"
            color="primary"
            size="large"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "white",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default Chat;
