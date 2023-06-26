import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import SummerBg from "../../images/summerBg.webp";

// import backgroundImage from "../../images/backGorund.jpg";
const BackgroundImageContainer = ({ text }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${SummerBg})`,
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
          Exercises
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
            Discover a wide range of exercises to fuel your fitness journey. Our
            database offers an extensive collection of exercises, complete with
            detailed instructions and video tutorials. Whether you're a beginner
            or a seasoned fitness enthusiast, you'll find exercises tailored to
            your needs. 
          </Typography>

          <Button
            sx={{
              padding: "20px",
              color: "white",
              bgcolor: "red",
              width: "150px",
              alignSelf: "flex-end",
              marginTop: "20px",
            }}
          >
            Exercises
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BackgroundImageContainer;
