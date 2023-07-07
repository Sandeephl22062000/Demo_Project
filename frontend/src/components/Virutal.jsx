import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import "./VirtualTrainerChat.css";

const VirtualTrainerChat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    const resp = await axios.post(
      "http://localhost:8000/api/trainer/virtualtrainer",
      {
        content: message,
      }
    );
    setResponse(resp?.data?.choices[0].message?.content);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const userMessage = { message: inputMessage, isUser: true };
      const responseMessage = { message: response, isUser: false };

      setChatMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        responseMessage,
      ]);

      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (chatMessages.length % 2 === 1) {
      sendMessage(chatMessages[chatMessages.length - 1].message);
    }
  }, [chatMessages]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "4rem",
        maxWidth: "10rem",
      }}
    >
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Virtual Trainer
        </Typography>

        <div className="chat-box-container">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`message-container ${
                msg.isUser ? "user-message" : "bot-message"
              }`}
            >
              {msg.message}
            </div>
          ))}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            response && (
              <div className="message-container bot-message">{response}</div>
            )
          )}
        </div>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            sx={{ marginRight: "1rem" }}
          />

          <Button
            variant="contained"
            className="send-button"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VirtualTrainerChat;
