import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container, Pagination, Stack } from "@mui/material";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
export default function BasicSelect() {
  const [muscle, setMuscle] = useState("");
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [exercise, setExercise] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [TotalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const clickHandler = async (currentPage) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/exercise/sortedExercises?muscle=${muscle}&difficulty=${difficulty}&page=${currentPage}`
      );
      setTotalPage(data.totalPages);
      setExercise(data.exercises);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const VideoHandler = (muscleName, exerciseName) => {
    navigate(`/execiseVideos/${exerciseName}/${muscleName}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    clickHandler(page);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:8000/api/exercise");
      const dataToShow = data.exercises;
      setData(dataToShow.slice(0, 4));
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [exercise]);

  return (
    <>
      <Container sx={{ minHeight: "80vh" }}>
        <Box
          sx={{
            minWidth: 700,
            backgroundColor: "white",
            display: "flex",
            my: 2,
          }}
        >
          <FormControl sx={{ width: "27%", margin: "5%", my: 1 }}>
            <InputLabel id="demo-simple-select-label">muscle</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={muscle}
              label="muscle"
              onChange={(e) => setMuscle(e.target.value)}
            >
              <MenuItem value="abductors">Abductors</MenuItem>
              <MenuItem value="adductors">Adductors</MenuItem>
              <MenuItem value="biceps">Biceps</MenuItem>
              <MenuItem value="calves">Calves</MenuItem>
              <MenuItem value="chest">Chest</MenuItem>
              <MenuItem value="forearms">Forearms</MenuItem>
              <MenuItem value="glutes">Glutes</MenuItem>
              <MenuItem value="hamstrings">Hamstrings</MenuItem>
              <MenuItem value="lats">Lats</MenuItem>
              <MenuItem value="lower_back">Lower back</MenuItem>
              <MenuItem value="middle_back">Middle back</MenuItem>
              <MenuItem value="neck">Neck</MenuItem>
              <MenuItem value="quadriceps">Quads</MenuItem>
              <MenuItem value="traps">Traps</MenuItem>
              <MenuItem value="triceps">Triceps</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "30%", marginRight: "10%", my: 1 }}>
            <InputLabel id="demo-simple-select-label">difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="difficulty"
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="expert">Expert</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
              color: "white",
              backgroundColor: "red",
              width: "155px",
              height: "63px",
              fontSize: "19px",
              "&:hover": {
                background: "red",
              },
            }}
            onClick={() => clickHandler(currentPage)}
          >
            Search
          </Button>
        </Box>
        {!isLoading ? (
          <Container sx={{ margin: "4rem 0" }}>
            {exercise?.length > 0
              ? exercise?.map((e) => (
                  <Box style={{ margin: "10px" }}>
                    <Card border="secondary" style={{ width: "100%" }}>
                      <Card.Header>{e.name}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Equipment Required : {e.equipment}
                        </Card.Title>
                        <Card.Title>Targeted Muscle : {e.muscle}</Card.Title>
                        <Card.Text>
                          Instruction:
                          <br />
                          {e.instructions}
                        </Card.Text>
                      </Card.Body>
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => VideoHandler(e.name, e.muscle)}
                      >
                        View Video
                      </Button>
                    </Card>
                  </Box>
                ))
              : data?.map((e) => (
                  <Box style={{ margin: "10px" }}>
                    <Card border="secondary" style={{ width: "100%" }}>
                      <Card.Header>{e.name}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Equipment Required : {e.equipment}
                        </Card.Title>
                        <Card.Title>Targeted Muscle : {e.muscle}</Card.Title>
                        <Card.Text>
                          Instruction:
                          <br />
                          {e.instructions}
                        </Card.Text>
                      </Card.Body>
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => VideoHandler(e.name, e.muscle)}
                      >
                        View Video
                      </Button>
                    </Card>
                  </Box>
                ))}
          </Container>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px 0 20px 0",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={TotalPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
