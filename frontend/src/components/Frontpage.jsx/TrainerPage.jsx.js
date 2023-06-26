import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import backgroundImage from "../../images/backGorund.jpg";
import { useNavigate } from "react-router-dom";
const BackgroundImageContainer = ({ text }) => {
  const navigate = useNavigate();
  const handleTrainer = () => {
    navigate("trainer");
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
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
          textAlign="right"
          sx={{ padding: "20px", fontWeight: 600, height: "140px" }}
        >
          Train with our experts
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            padding: "0 20px",
          }}
        >
          <Typography variant="h5" color="white" textAlign="right">
            Train with our expert trainers and take your fitness journey to the
            next level. Our experienced trainers are here to guide and motivate
            you every step of the way. With our personalized training programs,
            you'll receive one-on-one attention through chat,video and voice
            calls, and support tailored to your unique needs and goals
          </Typography>

          <Button
            onClick={handleTrainer}
            sx={{
              padding: "20px",
              color: "white",
              bgcolor: "red",
              width: "150px",
              alignSelf: "flex-end",
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
