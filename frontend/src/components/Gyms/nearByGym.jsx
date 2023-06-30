import React, { useEffect, useState } from "react";
import GymMap from "./GymMap";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const NearByGym = () => {
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = React.useState(null);
  const [searchPlace, setSearchPlace] = useState("");
  const handleMarkerClick = (gym) => {
    console.log(gym);
    setSelectedGym(gym);
  };

  const getCoordinates = async (place) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        console.log("Latitude:", lat);
        console.log("Longitude:", lon);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const YOUR_LATITUDE = 21.14564;
  const YOUR_LONGITUDE = 72.77831;

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `http://localhost:8000/api/gyms/${YOUR_LATITUDE}/${YOUR_LONGITUDE}`
      );
      setGyms(data.data);
    };
    fetchData();
  }, []);

  const searchHandler = () => {
    getCoordinates(searchPlace);
  };
  const center = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE };
  console.log(searchPlace);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography sx={{ width: "70%" }}>
          Find the Gym's near any place
        </Typography>
        <Button onClick={searchHandler}>search</Button>
      </Box>
      <TextField
        required
        id="outlined-required"
        name="place"
        value={searchPlace}
        label="searchplace"
        onChange={(e) => {
          setSearchPlace(e.target.value);
        }}
        type="string"
        sx={{ width: "60%", margin: "10px" }}
      />
      <GymMap
        gyms={gyms}
        center={center}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBkA1fdPi5_I43IVxS4Zlw57iUrwlGdBv8&`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Container>
  );
};

export default NearByGym;