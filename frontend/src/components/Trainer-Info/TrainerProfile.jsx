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
import Posts from "../Trainer-Info/PRofilePostCard";
import axios from "axios";
import RequestModal from "../RequestModal";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import { requestTrainer } from "../../store/trainer";
import { useDispatch, useSelector } from "react-redux";

const handleCommentButtonClick = () => {};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const [trainer, setTrainer] = useState("");
  const [variant, setVariant] = React.useState(undefined);
  const [post, showPost] = useState([]);
  const [message, setMessage] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const token = useSelector((state) => state?.user?.token);
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

  console.log(trainer._id);
  const sendRequestHandler = () => {
    dispatch(requestTrainer({ token, message, trainer: trainer._id }));
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
              src={trainer?.photo}
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
              {trainer.name}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              {trainer.email}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              Experience: {trainer.experience}
            </Typography>
            <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
              Specialization: {trainer.specialization}
            </Typography>
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
              <Typography fontWeight="lg">{trainer?.posts?.length}</Typography>
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
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              width: "100%",
              "& > button": { flex: 1 },
            }}
          >
            <Button variant="outlined" color="neutral">
              Clients
            </Button>
            <Button
              variant="solid"
              sx={{ background: "black", color: "white" }}
              onClick={() => {
                setVariant("plain");
              }}
            >
              Send Request
            </Button>
          </Box>
        </CardContent>
      </Card>
      {console.log(trainer?.posts?.length > 0)}
      {console.log(trainer?.posts)}
      {trainer?.posts?.length > 0 && <Posts />}
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <h2 id="variant-modal-title">Send Training Request</h2>
          <p id="variant-modal-description">Enter a message for the trainer:</p>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
          <Button onClick={sendRequestHandler} variant="contained">
            Send Request
          </Button>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
