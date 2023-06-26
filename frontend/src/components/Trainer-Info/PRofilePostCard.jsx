import React from "react";

const PRofilePostCard = (props) => {
  return (
    <Card sx={{ width: "20rem" }}>
    
      {console.log(props.post)}
      <CardHeader
        avatar={
          <Avatar
            src={user?.data?.photo}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        title={user?.data?.name}
        subheader={new Date(props.post.createdAt).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.post.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.caption}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PRofilePostCard;
