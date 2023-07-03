import { Box, Container, Grid, TextField, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";
import axios from "axios";
import { UserByID, searchUserKeyword } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => state?.user?.SearchUserResult);
  console.log("users", users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPost = () => {
    const data = async () => {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/post/posts/all"
      );
      console.log(response.data.posts);
      setPosts(response.data.posts);
    };
    data();
    setIsLoading(false);
  };
  useEffect(() => {
    if (search.length > 0) {
      console.log("SDVsdf");
      dispatch(searchUserKeyword(search));
    }
  }, [search]);
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
      <Container sx={{ minHeight: "80vh" }}>
        <AddPost />
        {!isLoading ? (
          posts.map((post) => <Posts post={post} />)
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "black" }} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ShowPost;
