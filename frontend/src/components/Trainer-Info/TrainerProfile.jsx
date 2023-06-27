import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
// import Posts from "../Trainer-Info/ProfilePost";
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
      const { data } = await axios.get(
        `http://localhost:8000/api/trainer/trainerDetail/${id}`
      );
      console.log(data.data);
      setTrainer(data.data);
      console.log(data.data.posts);
      showPost(data.data.posts);
    };
    trainerDetail();
  }, []);
  console.log(trainer);
  return (
    <Container
      sx={{
        minHeight: "80vh",
        marginTop: "2rem",
        width: "65rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "block",
            width: "1px",
            bgcolor: "warning.300",
            left: "500px",
            top: "-24px",
            bottom: "-24px",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Card
          sx={{
            width: "100%",
            flexWrap: "wrap",
            overflow: "auto",
          }}
        >
          <AspectRatio
            ratio="1"
            maxHeight={182}
            sx={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              width: "30%",
            }}
          >
            <img
              src={trainer?.photo}
              loading="lazy"
              alt=""
              style={{ objectFit: "cover" }}
            />
          </AspectRatio>
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              {trainer.name}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              {trainer.email}
            </Typography>
            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
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
                <Typography fontWeight="lg">
                  {trainer?.posts?.length}
                </Typography>
              </div>
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
            </Sheet>
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <Button variant="outlined" color="neutral">
                Chat
              </Button>
              <Button
                variant="solid"
                sx={{ background: "black", color: "white" }}
              >
                Send Request
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {console.log(trainer?.posts?.length > 0)}
      {console.log(trainer?.posts)}
      {/* {trainer?.posts?.length > 0 && */}
        {/* trainer?.posts?.map((post) => <Posts post={post} />)} */}
    </Container>
  );
};

export default ProfilePage;
