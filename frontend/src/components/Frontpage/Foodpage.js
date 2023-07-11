import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackgroundImageContainer = ({ text }) => {
  const navigate = useNavigate();
  const handleFood = () => {
    navigate("/food");
  };
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
          EAT YOUR PROTEIN
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            height: "100%",
            padding: "0 20px",
          }}
        >
          <Typography variant="h5" color="white" textAlign="left">
            Track your Calories,Nutrients and Micros according to your Goals.
            <br />
            Calucalate the amount of calorie you need to achieve your goals
          </Typography>
          <Button
            onClick={handleFood}
            sx={{
              padding: "20px",
              color: "white",
              bgcolor: "red",
              width: "150px",
              alignSelf: "flex-start",
              "&:hover": { backgroundColor: "red" },

              marginTop: "20px",
            }}
          >
            CALCULATE
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BackgroundImageContainer;
