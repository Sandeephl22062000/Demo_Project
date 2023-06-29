import React, { useEffect, useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Posts from "./Trainer-Info/PRofilePostCard";
import Challenges from "./Challenges/ChallengesOnProfile";
import axios from "axios";
import UpdateProfileModal from "./UpdateProfileModal";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { UserByID } from "../store/user";
import RequestTable from "./trainingRequestTable";

const handleCommentButtonClick = () => {};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const [trainer, setTrainer] = useState("");
  const [variant, setVariant] = useState(undefined);
  const [showRequests, setShowRequests] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.user?.token);

  useEffect(() => {
    dispatch(UserByID());
  }, []);

  const user = useSelector((state) => state?.user?.FindUserByID);
  console.log("user", user);

  console.log(trainer._id);
  const sendRequestHandler = () => {
    // dispatch(requestTrainer({ token, message, trainer: trainer._id }));
  };

  const toggleChallengesAndPosts = () => {
    if (showChallenges) {
      setShowChallenges(false);
      setShowPosts(true);
    } else {
      setShowChallenges(true);
      setShowPosts(false);
    }
  };

  return (
    <Container
      sx={{
        minHeight: "80vh",
        marginTop: "2rem",
        width: "65rem",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <AspectRatio ratio="1" maxHeight={250}>
            <img
              src={user?.photo}
              loading="lazy"
              alt=""
              style={{
                objectFit: "cover",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </AspectRatio>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Typography fontSize="xl" fontWeight="lg">
              {user?.name}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              {user?.email}
            </Typography>
            {user?.role === 1 && (
              <>
                <Typography
                  level="body2"
                  fontWeight="lg"
                  textColor="text.tertiary"
                >
                  Experience: {user?.experience}
                </Typography>
                <Typography
                  level="body2"
                  fontWeight="lg"
                  textColor="text.tertiary"
                >
                  Specialization: {user?.specialization}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Card
        sx={{
          width: "100%",
          flexWrap: "wrap",
          overflow: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              width: "100%",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body3" fontWeight="lg">
                Posts
              </Typography>
              <Typography fontWeight="lg">{user?.posts?.length}</Typography>
            </div>
            {user?.role === 1 ? (
              <>
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Clients
                  </Typography>
                  <Typography fontWeight="lg">980</Typography>
                </div>
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Rating
                  </Typography>
                  <Typography fontWeight="lg">8.9</Typography>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Challenges
                  </Typography>
                  <Typography fontWeight="lg">980</Typography>
                </div>
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Rating
                  </Typography>
                  <Typography fontWeight="lg">8.9</Typography>
                </div>
              </>
            )}
          </Sheet>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              width: "100%",
              "& > button": { flex: 1 },
            }}
          >
            <Button
              onClick={() => {
                setVariant("solid");
              }}
              sx={{
                background: "black",
                color: "white",
                height: "50px",
                borderRadius: "15px",
                "&:hover": {
                  background: "black",
                },
              }}
            >
              Edit Profile
            </Button>

            {user?.role === 1 ? (
              <>
                <Button
                  onClick={() => {
                    setShowRequests(true);
                  }}
                  sx={{
                    background: "black",
                    color: "white",
                    height: "50px",
                    borderRadius: "15px",
                    "&:hover": {
                      background: "black",
                    },
                  }}
                >
                  View Requests
                </Button>
              </>
            ) : (
              <Button
                onClick={toggleChallengesAndPosts}
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  borderRadius: "15px",

                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                {showChallenges ? "View Posts" : "Challenges"}
              </Button>
            )}
          </Box>
        </CardContent>
        {user?.role === 1 && (showRequests ? <RequestTable /> : <Posts />)}
        {user?.role === 0 && showChallenges && <Challenges />}
        {showPosts && !showRequests && user?.posts?.length > 0 ? (
          <Posts />
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>No Post yet</Box>
        )}
      </Card>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <UpdateProfileModal variant={variant} />
      </Modal>
    </Container>
  );
};

export default ProfilePage;
