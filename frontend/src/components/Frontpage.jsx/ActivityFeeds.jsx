import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import backgroundImage from "../../images/backGorund.jpg";
import { Navigate, useNavigate } from "react-router-dom";

const BackgroundImageContainer = ({ text }) => {
  const navigate = useNavigate()
  const handleActivities = () =>{
    navigate("/activities")
  }
  return (
    <Box
      sx={{
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Typography
          variant="h2"
          color="red"
          textAlign="left"
          sx={{ padding: "20px", fontWeight: 600, height: "140px" }}
        >
          ACTIVITY FEEDS
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start", // Align text and button to the left
            flexDirection: "column",
            height: "100%",
            padding: "0 20px",
          }}
        >
          <Typography variant="h5" color="white" textAlign="left">
            Check out your friend's progress and grow together
          </Typography>
          <Button
            onClick={handleActivities}
            sx={{
              padding: "20px",
              color: "white",
              bgcolor: "red",
              width: "150px",
              alignSelf: "flex-start",
              marginTop: "20px",
            }}
          >
            FEEDS
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BackgroundImageContainer;
