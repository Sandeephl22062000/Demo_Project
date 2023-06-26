import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Post from "./ProfilePost";
import axios from "axios";
const handleCommentButtonClick = () => {};
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const [trainer, setTrainer] = useState("");
  const [post, showPost] = useState([]);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const trainerDetail = async () => {
      const { data } = await axios.get(`/api/trainer/trainerDetail/${id}`);
      console.log(data.data);
      setTrainer(data.data);
      console.log(data.data.posts);
      showPost(data.data.posts);
    };
    trainerDetail();
  }, []);
  return (
    <Container
      sx={{
        minHeight: "80vh",
        marginTop: "2rem",
        width: "70rem",
      }}
    >
      <Grid container sx={{ height: "200px" }}>
        <Grid item xs={3.1}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20%",
            }}
          >
            <CardMedia
              image={trainer.photo}
              title="varverv"
              sx={{ height: "100%", width: "100%", borderRadius: "20%" }}
            />
          </Card>
        </Grid>
        <Grid item xs={8.7} sx={{ marginLeft: "15px" }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "2%",
            }}
          >
            <div style={{ margin: "20px 0 0 30px" }}>
              <Typography>
                <b>Name: </b>
                {trainer.name}
              </Typography>
              <Typography>
                <b>Email:</b> {trainer.email}
              </Typography>
              <Typography>
                <b>Specialization:</b> {trainer.specialization}
              </Typography>
              <Typography>
                <b>Description:</b>
              </Typography>
              <Typography>
                <b>Experience:</b> {trainer.experience} years
              </Typography>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Box sx={{ marginLeft: "30px" }}>
                {" "}
                <Button>Send Request</Button>
                <Button>Message</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              color: "black",
            }}
          >
            {/* <Button
              onClick={() => {
                setClientExperience(false);
              }}
            >
              View Post
            </Button>
            <Button
              onClick={() => {
                setClientExperience(true);
              }}
            >
              Clients Experience
            </Button> */}
          </Box>

          <Card
            sx={{
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {console.log(post.length)}
            {post.length === 0 ? (
              <Box>
                <Typography sx={{ fontSize: "35px", height: "100%" }}>
                  <div>
                    <b>No Photo posted yet</b>
                  </div>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  justifyContent: "flex-end",
                  gap: "16px",
                  margin: "4px",
                }}
              >
                {post.map((post) => <Post post={post} />)}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
