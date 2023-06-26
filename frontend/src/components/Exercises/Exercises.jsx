import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container } from "@mui/material";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
export default function BasicSelect() {
  const [muscle, setMuscle] = useState("");
  const [data, setData] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [exercise, setExercise] = useState([]);
  const navigate = useNavigate();
  const clickHandler = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/exercise/sortedExercises?muscle=${muscle}&difficulty=${difficulty}`
    );

    // console.log(`https://www.youtube.com/watch?v=${videoId}`)
    setExercise(data.exercises);
  };

  const VideoHandler = (muscleName, exerciseName) => {
    navigate(`/execiseVideos/${exerciseName}/${muscleName}`);
  };
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/exercise");
    const dataToShow = data.exercises;

    setData(dataToShow.slice(0, 4));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            minWidth: 700,
            backgroundColor: "white",
            display: "flex",
            my: 2,
          }}
        >
          <FormControl sx={{ width: "30%", marginRight: "10%", my: 1 }}>
            <InputLabel id="demo-simple-select-label">muscle</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={muscle}
              label="muscle"
              onChange={(e) => setMuscle(e.target.value)}
            >
              <MenuItem value="abductors">abductors</MenuItem>
              <MenuItem value="adductors">adductors</MenuItem>
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
              <MenuItem value="beginner">beginner</MenuItem>
              <MenuItem value="intermediate">intermediate</MenuItem>
              <MenuItem value="expert">expert</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
              color: "white",
              backgroundColor: "red",
              width: "155px",
              height: "63px",
              fontSize: "19px",
            }}
            onClick={clickHandler}
          >
            Search
          </Button>
        </Box>
        {/* <Button onClick={VideoHandler}>Video Tutorials</Button> */}
        {exercise.length > 0
          ? exercise.map((e) => (
              <Box style={{ margin: "10px" }}>
                <Card border="secondary" style={{ width: "100%" }}>
                  <Card.Header>{e.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>Equipment Required : {e.equipment}</Card.Title>
                    <Card.Title>Targeted Muscle : {e.muscle}</Card.Title>
                    <Card.Text>
                      Instruction:
                      <br />
                      {e.instructions}
                    </Card.Text>
                  </Card.Body>
                  <Button onClick={() => VideoHandler(e.name, e.muscle)}>
                    View Video
                  </Button>
                </Card>
              </Box>
            ))
          : data.map((e) => (
              <Box style={{ margin: "10px" }}>
                <Card border="secondary" style={{ width: "100%" }}>
                  <Card.Header>{e.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>Equipment Required : {e.equipment}</Card.Title>
                    <Card.Title>Targeted Muscle : {e.muscle}</Card.Title>

                    <Card.Text>
                      Instruction:
                      <br />
                      {e.instructions}
                    </Card.Text>
                  </Card.Body>
                  {/* <Button onClick={VideoHandler(e.name, e.muscle)}>
                    View Video
                  </Button> */}
                </Card>
              </Box>
            ))}
      </Container>
    </>
  );
}

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </React.Fragment>
// );

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined">{card}</Card>
//     </Box>
//   );
// }
