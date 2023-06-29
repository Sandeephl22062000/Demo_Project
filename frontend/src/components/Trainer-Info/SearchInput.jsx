import React, { useEffect, useState } from "react";
import axios from "axios";
// import UserListItem from "../miscelleneous/UserListItem";
// import LoadingSkeleton from "../miscelleneous/LoadingSpinner";

import {
  Box,
  Button,
  Container,
  InputBase,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

import { Link, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(1);

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
        `http://localhost:8000/api/trainer/${search}/${page}`
      );
      console.log(data);
      console.log(data.totalPages);
      setLoading(false);
      setTotalPage(data.totalPages);
      setSearchResult(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getTrainerDetail = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/trainer/${page}`
    );
    setTrainer(data.data);
    setTotalPage(data.totalPages);
  };

  useEffect(() => {
    getTrainerDetail();
  }, [page]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  console.log(page);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      submithandler();
    } else {
      setSearchResult(trainer); // Display the data from getTrainerDetail() when search is empty
    }
  }, [search, trainer]);

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
              sx={{ background: "black", color: "white" }}
              onClick={(e) => {
                submithandler(e);
              }}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0 20px 0",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={TotalPage}
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default SearchInput;
