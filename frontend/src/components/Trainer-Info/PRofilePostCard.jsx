import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Modal,
  Button,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserByID } from "../../store/user";
import Post from "../Activities/Posts";

const ProfilePostCard = () => {
  const user = useSelector((state) => state?.user?.FindUserByID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [selectedMediaType, setSelectedMediaType] = useState("image");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    dispatch(UserByID(id));
  }, []);

  const handleMediaButtonClick = (mediaType) => {
    setSelectedMediaType(mediaType);
    setPage(1); // Reset page when media type changes
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    if (selectedPost) navigate(`/post/${selectedPost}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const filterPostsByMediaType = (post) => {
    if (selectedMediaType === "image") {
      return post?.image && post?.image !== "";
    } else if (selectedMediaType === "video") {
      return post?.video && post?.video !== "";
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedPosts = user?.posts
    ?.slice()
    .reverse()
    .filter(filterPostsByMediaType)
    .slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => handleMediaButtonClick("image")}
          sx={{
            background: "black",
            color: "white",
            height: "3rem",
            width: "7rem",
            margin: "0.5rem",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          Images
        </Button>
        <Button
          onClick={() => handleMediaButtonClick("video")}
          sx={{
            border: "2px solid black",
            color: "black",
            height: "3rem",
            width: "7rem",
            margin: "0.5rem",
          }}
        >
          Videos
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {paginatedPosts?.map((post) => {
          const firstCharacter = user?.name[0].toUpperCase();
          const isVideo = post?.video && post?.video !== "";
          console.log("post", post);
          console.log("selectedPost", selectedPost);
          return (
            <Card
              sx={{ width: "19.6rem", margin: "0.5rem", boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)" }}
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              style={{ cursor: "pointer" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={user?.photo}
                    sx={{ bgcolor: "red" }}
                    aria-label="recipe"
                  >
                    {firstCharacter}
                  </Avatar>
                }
                title={user?.name}
                subheader={new Date(post?.createdAt).toLocaleString()}
              />
              {isVideo ? (
                <CardMedia component="video" controls>
                  <source src={post?.video} type="video/mp4" />
                </CardMedia>
              ) : (
                <CardMedia
                  component="img"
                  image={post?.image}
                  alt="Post image"
                />
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post?.caption}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      {user?.posts?.length > postsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Pagination
            count={Math.ceil(user?.posts?.length / postsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      )}

      {/* <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: "4px",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        {selectedPost && <Post post={selectedPost} name={user?.name} />}
      </Box> */}
    </>
  );
};

export default ProfilePostCard;
