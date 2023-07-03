import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/system";

import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import storage from "../../utils/firebase";
import "./AddPost.css"; // Import the CSS file
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import ChallengesModel from "../Challenges/AddChallenges";

const AddPost = () => {
  const [images, setImages] = useState("");
  const [status, setStatus] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [variant, setVariant] = useState(undefined);
  const [variant2, setVariant2] = useState(undefined);

  const token = useSelector((state) => state.user.token);
  console.log(token);
  const photoupload = (event) => {
    let file = event.target.files[0];
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setSelectedPhoto(url);
        });
      }
    );
  };

  const handlePhotoUpload = (event) => {
    photoupload(event);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };
  const handleCloseModal = () => {
    setVariant2(undefined);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const createPost = async () => {
      console.log("asdfghjklsdfghjk");
      console.log("Selected Photo:", selectedPhoto);
      console.log("Caption:", caption);
      const data = await axios.post(
        "api/post/new",
        {
          caption: caption,
          image: selectedPhoto,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    };
    try {
      createPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{ borderColor: "black", backGround: "grey", margin: "20px 0 20px 0" }}
    >
      <Box sx={{ border: "1px solid black", borderRadius: "20px" }}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={10}>
            <TextField
              id="outlined-required"
              name="fullName"
              value={status}
              placeholder="Share your progress with your friends"
              type="string"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              sx={{ width: "100%", margin: "8px" }}
            />
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="center">
            <Button
              sx={{
                background: "black",
                color: "white",
                height: "50px",
                "&:hover": {
                  background: "black", // Set the same background color on hover
                },
              }}
            >
              Upload Status
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* Content for the second container */}
            <Box style={{ height: "60px" }}>
              <Button
                variant="soft"
                color="neutral"
                onClick={() => {
                  setVariant("soft");
                }}
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  margin: "0 30px",
                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                Upload Photo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <form
            onSubmit={handleFormSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  border: "1px dashed #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {selectedPhoto ? (
                  <img
                    src={selectedPhoto}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Button variant="outlined" component="label">
                    Add Photo
                    <input
                      type="file"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                  </Button>
                )}
                {console.log(selectedPhoto)}
              </Box>
              <TextField
                label="Caption"
                variant="outlined"
                value={caption}
                onChange={handleCaptionChange}
                multiline
                rows={4}
              />
              <Button
                type="submit"
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                Post
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
      <Modal open={variant2 === "soft"} onClose={handleCloseModal}>
        <ChallengesModel variant={variant2} />
      </Modal>
    </Container>
  );
};

export default AddPost;
