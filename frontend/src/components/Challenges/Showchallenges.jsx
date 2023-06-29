import React from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  IconButton,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showAllChallenges } from "../../store/challenges";
import { AspectRatio, CardOverflow } from "@mui/joy";

const CirclePhotoGrid = () => {
  const token = useSelector((state) => state.user.token);
  const getChallenges = useSelector(
    (state) => state?.challenge?.showChallenges
  );
  console.log(getChallenges);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllChallenges(token));
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "70%" }}>
        {getChallenges.map((challenge) => (
          <Box sx={{ marginTop: "50px" }}>
            <Card
              sx={{ width: "100%", background: "#BFBEBE", borderRadius: "5%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  marginTop: "20px",
                }}
              >
                <Box
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "black",
                    backgroundImage: `url(${challenge?.sender?.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <DoubleArrowIcon /> <DoubleArrowIcon />
                <Box
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "black",
                    backgroundImage: `url(${challenge?.receiver?.photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  justfiContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  <b> Title:</b>
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  <b> Description:{challenge.challengeDescription}</b>
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                }}
              >
                <Button
                  sx={{
                    height: "50px",
                    display: "flex-end",
                    background: "black",
                    color: "white",
                  }}
                >
                  Challenge Details
                </Button>
              </Box>
            </Card>

          
            {/* <Typography></Typography>
          <h1></h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "black",
                backgroundImage: `url(${challenge?.sender?.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <DoubleArrowIcon /> <DoubleArrowIcon />
            <Box
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "black",
                backgroundImage: `url(${challenge?.receiver?.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Box> */}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CirclePhotoGrid;
