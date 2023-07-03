import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UserByID } from "../../store/user";


const PRofilePostCard = (props) => {
  

  const user = useSelector((state) => state?.user?.FindUserByID);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(UserByID(id));
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {user?.posts?.map((post) => (
        <Card sx={{ width: "19.0rem", margin: "0.5rem" }}>
          <CardHeader
            avatar={
              <Avatar
                src={user?.photo}
                sx={{ bgcolor: "red" }}
                aria-label="recipe"
              >
                R
              </Avatar>
            }
            title={user?.name}
            subheader={new Date(post?.createdAt).toLocaleString()}
          />
          <CardMedia
            component="img"
            height="250"
            image={post?.image}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post?.caption}
            </Typography>
          </CardContent>
        </Card>
      ))}
      
    </Box>
  );
};

export default PRofilePostCard;
