import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  Button,
  Container,
  Pagination,
  Stack,
  Modal,
  Backdrop,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

const ExerciseVideo = () => {
  const [Videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const muscles = params.muscle;
  const exerciseName = params.exercise;

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      console.log(params);
      const maxResults = 22;
      const apiKey = "AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0";

      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName} ${muscles} workout tutorial&type=video&maxResults=${maxResults}&key=${apiKey}`
      );
      console.log(data);
      console.log(data.items);
      setVideos(data.items);
      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  const videosPerPage = 9;
  const totalPages = Math.ceil(Videos.length / videosPerPage);

  return (
    <>
      <Container sx={{ minHeight: "80vh" }}>
        {!isLoading ? (
          <>
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
              {Videos.slice(
                (page - 1) * videosPerPage,
                page * videosPerPage
              ).map((video) => (
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
                    <Button
                      onClick={() => handleVideoClick(video)}
                      sx={{
                        background: "black",
                        color: "white",
                        marginButtom: "30px",
                        "&:hover": { backgroundColor: "black" },
                      }}
                    >
                      View Video
                    </Button>
                  </CardOverflow>
                </Card>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                />
              </Stack>
            </Box>
            <Modal
              open={isModalOpen}
              onClose={handleModalClose}
              aria-labelledby="video-modal-title"
              aria-describedby="video-modal-description"
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
                sx: { backdropFilter: "blur(8px)" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  height: "80%",
                  maxWidth: "800px",
                  maxHeight: "80%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                {selectedVideo && (
                  <YouTube
                    videoId={selectedVideo.id.videoId}
                    opts={{
                      width: "100%",
                      height: "500rem",
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />
                )}
              </Box>
            </Modal>
          </>
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
    </>
  );
};

export default ExerciseVideo;
