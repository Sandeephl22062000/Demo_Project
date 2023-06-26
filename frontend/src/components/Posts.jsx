/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import Face from "@mui/icons-material/Face";
import { Container, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Post = (props) => {
  const [like, AddLike] = React.useState(false);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState([]);
  const token = useSelector((state) => state.user.token);
  console.log(token);

  const addLike = async () => {
    const data = await axios.post(
      `/api/post/likepost/${props.post._id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
  };

  // const getComments = () =>{
  //   const data = await axios.get()
  // }
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `/api/post/commentpost/${props.post._id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data.success.comments[0]);
  };
  const calculateTime = Math.floor(
    (new Date() - new Date(props?.post?.createdAt)) / (1000 * 60 * 60 * 24)
  );
  useEffect(() => {
    setShowComment(props.post?.comments);
  }, []);
  console.log("nsjfdnbotn", props?.post);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0 30px 0",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "80%",
          "--Card-radius": (theme) => theme.vars.radius.xs,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar size="sm" src={props.post?.postedBy?.photo}></Avatar>
          </Box>
          <Typography fontWeight="lg">{props.post?.postedBy?.name}</Typography>
        </CardContent>
        <CardOverflow>
          <AspectRatio>
            <img
              src={props.post?.image}
              alt=""
              loading="lazy"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", mx: -1 }}
        >
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={addLike}
            >
              <FavoriteBorder /> {props?.post?.likes?.length}
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined /> {props.post?.comments?.length}
            </IconButton>
          </Box>
        </CardContent>
        <CardContent>
          <Typography fontSize="sm">
            <Link
              component="button"
              color="neutral"
              fontWeight="lg"
              textColor="text.primary"
            >
              {props.post?.postedBy?.name}
            </Link>{" "}
            {props.post?.caption}
          </Typography>
          {console.log(showComment)}
          {showComment
            ?.slice()
            .reverse()
            .map((comment) => (
              <Typography>
                {comment?.user?.name} {comment?.comment}
              </Typography>
            ))}

          <Link
            component="button"
            underline="none"
            fontSize="10px"
            sx={{ color: "text.tertiary", my: 0.5 }}
          >
            <Typography fontSize="sm">
              {console.log(calculateTime)}
              {calculateTime === 0 ? (
                <Typography
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  Today
                </Typography>
              ) : (
                <Typography
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  {calculateTime} days ago
                </Typography>
              )}
            </Typography>
          </Link>
        </CardContent>
        <CardOverflow
          sx={{
            pb: "var(--Card-padding)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Align items to the left
          }}
        >
          <form onSubmit={addCommentHandler} style={{ display: "flex" }}>
            <Input
              variant="plain"
              size="sm"
              placeholder="Add a comment…"
              sx={{ flexGrow: 1, "--Input-focusedThickness": "0px" }}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button type="submit" sx={{ ml: 1 }}>
              Post
            </Button>
          </form>
        </CardOverflow>
      </Card>
    </Container>
  );
};
export default Post;
