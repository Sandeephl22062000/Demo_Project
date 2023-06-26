import React, { useEffect, useState } from "react";
import axios from "axios";
// import UserListItem from "../miscelleneous/UserListItem";
// import LoadingSkeleton from "../miscelleneous/LoadingSpinner";

import { Box, Button, Container, InputBase, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link, useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingtrainer, setloadingTrainer] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const submithandler = async (e) => {
    try {
      setLoading(true);
      if (!search) {
        return;
      }
      const { data } = await axios.get(
        `http://localhost:8000/api/trainer/${search}`
      );
      console.log(data.data);
      setLoading(false);
      setSearchResult(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  console.log(searchResult);
  const getTrainerDetail = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/trainer`);
    console.log(data.data);
    setSearchResult(data.data);
  };

  useEffect(() => {
    getTrainerDetail();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      submithandler();
    }
  }, [search]);

  return (
    <Container>
      <form style={{ width: "100%" }} onSubmit={submithandler}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <InputBase
              sx={{ bgcolor: "white", padding: "10px", width: "500px" }}
              fullWidth={true}
              id="search"
              name="search"
              label="search"
              placeholder="Name or Email"
              onChange={handleInputChange}
            />
            <Button
              onClick={submithandler}
              color="primary"
              variant="contained"
              type="submit"
            >
              Search
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              {searchResult.map((trainer) => (
                <Card sx={{ width: 350 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title={trainer.name}
                    // subheader="September 14, 2016"
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={trainer.photo}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Email:{trainer.email}
                      <br />
                      specification:not created model yet
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <a href={`/trainer/${trainer._id}`}>
                      <Button
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          textDecoration: "none !important",
                        }}
                      >
                        View Profile
                      </Button>
                    </a>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default SearchInput;
