import { Box, Button, Container, Grid, TextField, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";
import axios from "axios";
import { UserByID, searchUserKeyword } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const users = useSelector((state) => state?.user?.SearchUserResult);
  console.log("users", users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPost = () => {
    const data = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/post/posts/all"
      );
      console.log(response.data.posts);
      setPosts(response.data.posts);
    };
    data();
  };
  useEffect(() => {
    if (search.length > 0) {
      console.log("SDVsdf");
      dispatch(searchUserKeyword(search));
    }
  }, [search]);
  console.log(search);
  const clickHandler = () => {};
  useEffect(() => {
    getPost();
  }, []);

  const handleOptionClick = (id) => {
    dispatch(UserByID(id));
    navigate(`/user/${id}`);
  };
  const renderOption = (option) =>
    users?.map((user) => (
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => handleOptionClick(user._id)}
      >
        <Avatar src={user.photo} alt={user.name} />
        <span>{user.name}</span>
      </Box>
    ));

  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Autocomplete
            freeSolo
            disableClearable
            sx={{ width: "60%", margin: "12px" }}
            options={users || []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search your friends"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            renderOption={renderOption}
          />
        </Box>
      </Container>
      <Container>
        <AddPost />
        {posts.map((post) => (
          <Posts post={post} />
        ))}
      </Container>
    </Box>
  );
};

export default ShowPost;
