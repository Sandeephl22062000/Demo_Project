import React, { useEffect, useState } from "react";
import { Box, Container, TextField, Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserByID, searchUserKeyword } from "../../store/user";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost";
import Posts from "./Posts";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState(null);

  const users = useSelector((state) => state?.user?.SearchUserResult);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPost = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "http://localhost:8000/api/post/posts/all"
    );
    setPosts(response.data.posts);
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (search.length > 0) {
      dispatch(searchUserKeyword(search));
    }
  }, [search]);

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  const handleOptionClick = (id) => {
    dispatch(UserByID(id));
    navigate(`/user/${id}`);
  };

  const renderOption = (option) =>
    users?.map((user) => (
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => handleOptionClick(user._id)}
        key={user._id}
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
      <Container sx={{ minHeight: "100vh" }}>
        <AddPost setNewPost={setNewPost} />
        {!isLoading ? (
          posts.map((post) => <Posts key={post.id} post={post} />)
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
