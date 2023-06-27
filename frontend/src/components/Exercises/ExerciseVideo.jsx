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
import { Button, Container, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ExerciseVideo = () => {
  const [Videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const muscles = params.muscle;
  const exerciseName = params.exercise;

  useEffect(() => {
    const fetchVideos = async () => {
      console.log(params);
      const maxResults = 22;
      const apiKey = "AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0";
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName} ${muscles} workout tutorial&type=video&maxResults=${maxResults}&key=${apiKey}`
      );
      console.log(data);
      console.log(data.items);
      setVideos(data.items);
    };

    fetchVideos();
  }, []);

  const videosPerPage = 9;
  const totalPages = Math.ceil(Videos.length / videosPerPage);

  return (
    <Container>
      {/* <FormControl
        sx={{
          display: "flex",
          width: "50%",
          my: 10,
        }}
      > */}
        {/* <InputLabel id="demo-simple-select-label">Muscle</InputLabel> */}
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={muscles}
          label="muscles"
          onChange={(e) => setMuscle(e.target.value)}
        >
          <MenuItem value="biceps">Biceps</MenuItem>
          <MenuItem value="calves">Calves</MenuItem>
          <MenuItem value="chest">Chest</MenuItem>
          <MenuItem value="forearms">Forearms</MenuItem>
          <MenuItem value="glutes">Glutes</MenuItem>
          <MenuItem value="hamstrings">Hamstrings</MenuItem>
          <MenuItem value="lats">Lats</MenuItem>
          <MenuItem value="lower_back">Lower_back</MenuItem>
          <MenuItem value="middle_back">Middle_back</MenuItem>
          <MenuItem value="neck">Neck</MenuItem>
          <MenuItem value="quadriceps">Quadriceps</MenuItem>
          <MenuItem value="traps">Traps</MenuItem>
          <MenuItem value="triceps">Triceps</MenuItem>
        </Select> */}
      {/* </FormControl> */}
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
        {Videos.slice((page - 1) * videosPerPage, page * videosPerPage).map(
          (video) => (
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
                  Targeted Muscle: {muscles}
                </Typography>
              </CardContent>
              <CardOverflow
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      background: "black",
                      color: "white",
                      marginButtom: "30px",
                      "&:hover": { backgroundColor: "black" },
                    }}
                  >
                    View Video
                  </Button>
                </a>
              </CardOverflow>
            </Card>
          )
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        {" "}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default ExerciseVideo;
