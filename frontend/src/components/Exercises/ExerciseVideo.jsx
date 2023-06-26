import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ExerciseVideo = () => {
  const [muscle, setMuscle] = useState("");
  const [Videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const FetchedVideos = async () => {
      console.log(params);
      var maxResults = 10;
      const muscles = params.muscle;
      const exerciseName = params.exercise;

      const apiKey = 'AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0';

      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName} ${muscles} workout tutorial&type=video&maxResults=${maxResults}&key=${apiKey}`
      );
      console.log(data)
      console.log(data.items);
      setVideos(data.items);
    };
    FetchedVideos();
  }, []);

  return (
    <Container>
      <FormControl
        sx={{
          display: "flex",

          width: "50%",
          my: 10,
        }}
      >
        <InputLabel id="demo-simple-select-label">muscle</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={muscle}
          label="muscle"
          onChange={(e) => setMuscle(e.target.value)}
        >
          <MenuItem value="biceps">biceps</MenuItem>
          <MenuItem value="calves">calves</MenuItem>
          <MenuItem value="chest">chest</MenuItem>
          <MenuItem value="forearms">forearms</MenuItem>
          <MenuItem value="glutes">glutes</MenuItem>
          <MenuItem value="hamstrings">hamstrings</MenuItem>
          <MenuItem value="lats">lats</MenuItem>
          <MenuItem value="lower_back">lower_back</MenuItem>
          <MenuItem value="middle_back">middle_back</MenuItem>
          <MenuItem value="neck">neck</MenuItem>
          <MenuItem value="quadriceps">quadriceps</MenuItem>
          <MenuItem value="traps">traps</MenuItem>
          <MenuItem value="triceps">triceps</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          maxWidth: "100%",
          marginBottom: "10px",
          mt: 4,
        }}
      >
        {Videos.map((video) => (
          <Card sx={{ width: 320, boxShadow: "lg" }}>
            <CardOverflow>
              <AspectRatio sx={{ minWidth: 200 }}>
                <img
                  src={video.snippet.thumbnails.high.url}
                  srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography fontWeight="xl">
                Title:{video.snippet.title}
              </Typography>
              <Typography fontSize="xl" fontWeight="xl" sx={{ mt: 1 }}>
                Targeted Muscle:{muscle}
              </Typography>
              {/* <Typography level="body2">
                (Only <b>7</b> left in stock!)
              </Typography> */}
              {/* <Typography fontWeight="xl">Description :{}</Typography> */}
            </CardContent>
            <CardOverflow>
              <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
                <Button variant="solid" color="danger" size="lg">
                  View Video
                </Button>
              </a>
            </CardOverflow>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ExerciseVideo;
