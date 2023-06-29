import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  CardActionArea,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showAllChallenges } from "../../store/challenges";

export default function MediaControlCard() {
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments((prevComments) => [...prevComments, comment]);
      setComment("");
    }
  };

  const token = useSelector((state) => state.user.token);
  const getChallenges = useSelector(
    (state) => state?.challenge?.showChallenges
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllChallenges(token));
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "50px",
      }}
    >
      {console.log(getChallenges)}
      {getChallenges.map((challenge) => (
        <Card sx={{ width: "80%", border: " 1px solid #000", margin: "10px", }}>
          <CardActionArea>
            <Card sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemText>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="left"
                      spacing={3}
                      style={{ marginLeft: "-13px", marginBottom: "20px" }}
                    >
                      <Grid item>
                        <Avatar
                          sx={{ width: 35, height: 35 }}
                          src={challenge?.sender?.photo}
                        ></Avatar>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="div">
                          {challenge?.sender?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider style={{ width: "100%" }} />
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        flexDirection: "row",
                        marginTop: "20px",
                        marginLeft: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <Grid
                        container
                        alignItems="center"
                        spacing={3}
                        flexDirection="row"
                      >
                        {challenge?.receiver.map((receive) => (
                          <>
                            <Grid item>
                              <Avatar
                                sx={{ width: 35, height: 35 }}
                                src={receive?.photo}
                              ></Avatar>
                            </Grid>
                            <Grid item>
                              <Typography variant="h6" component="div">
                                {receive?.name}
                              </Typography>
                            </Grid>
                          </>
                        ))}
                      </Grid>
                    </Box>
                  </ListItemText>
                </ListItem>
              </Box>
            </Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Challenges
              </Typography>
              <Typography variant="body6" color="text.secondary">
                {challenge?.challengeDescription}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Rules
              </Typography>
              <Typography gutterBottom variant="body6" color="text.secondary">
                {challenge?.challengeRules}
              </Typography>
            </CardContent>
            <Divider style={{ width: "100%" }} />
          </CardActionArea>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            {challenge?.receiver?.map((receive) => (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginRight: "10px",
                  borderRadius: "10px",
                  height: "70px",
                  width: "200px",
                }}
              >
                {receive?.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <Button>
              <FavoriteBorderIcon
                onClick={handleLike}
                style={{ margin: "10px" }}
              />
            </Button>
            <Typography color="primary" style={{ margin: "-5px" }}>
              {likeCount}
            </Typography>
          </Box>

          <Box sx={{ padding: "0 16px" }}>
            {comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </Box>
          <Box sx={{ maxHeight: 300, overflow: "auto", marginTop: "10px" }}>
            {comments.map((comment, index) => (
              <ListItem key={index}></ListItem>
            ))}
          </Box>
          <Box sx={{ padding: "0 16px", marginBottom: "10px" }}>
            <TextField
              label="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Button color="primary" onClick={handleComment}>
                    <SendIcon />
                  </Button>
                ),
              }}
            />
          </Box>
        </Card>
      ))}
    </Container>
  );
}
