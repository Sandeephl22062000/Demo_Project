import React, { useEffect, useState } from "react";
import GymMap from "./GymMap";
import axios from "axios";
import { Container, Typography } from "@mui/material";

const NearByGym = () => {
  const [gyms, setGyms] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const handleMarkerClick = (gym) => {
    setGyms(gym);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude: " + latitude + ", Longitude: " + longitude);
          setCurrentLocation({
            latitude,
            longitude,
          });
        },
        function (error) {
          console.error("Error getting current location: " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentLocation.latitude && currentLocation.longitude) {
        const data = await axios.get(
          `http://localhost:8000/api/gyms/${currentLocation.latitude}/${currentLocation.longitude}`
        );
        console.log(data);
        setGyms(data.data);
      }
    };
    fetchData();
  }, [currentLocation]);

  const center = {
    lat: currentLocation.latitude,
    lng: currentLocation.longitude,
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" align="center" sx={{ m: 2 }}>
        Gyms near your location
      </Typography>
      {/* 
      <TextField
        required
        id="outlined-required"
        name="place"
        value={searchPlace}
        label="Enter location"
        onChange={(e) => {
          setSearchPlace(e.target.value);
        }}
        type="string"
        sx={{ width: "60%", margin: "10px" }}
      /> */}
      {/* 
      <Button onClick={searchHandler} variant="contained" color="primary">
        Search
      </Button> */}

      <GymMap
        gyms={gyms}
        center={center}
        onMarkerClick={handleMarkerClick}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBkA1fdPi5_I43IVxS4Zlw57iUrwlGdBv8&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Container>
  );
};

export default NearByGym;
