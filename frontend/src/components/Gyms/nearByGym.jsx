import React, { useEffect, useState } from "react";
import GymMap from "./GymMap";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const NearByGym = () => {
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [searchPlace, setSearchPlace] = useState("");
  const [initialGym, setInitialGym] = useState(null); // Added state for initial gym

  const handleMarkerClick = (gym) => {
    setSelectedGym(gym);
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
        setCurrentLocation({
          latitude: lat,
          longitude: lon,
        });
        setSearchPlace("");
        return { latitude: lat, longitude: lon };
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error:", error);
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
        setSelectedGym(null);
        setInitialGym(data.data[0]); // Set the initial gym
      }
    };
    fetchData();
  }, [currentLocation]);

  const searchHandler = async () => {
    const coordinates = await getCoordinates(searchPlace);
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      const data = await axios.get(
        `http://localhost:8000/api/gyms/${latitude}/${longitude}`
      );
      setGyms(data.data);
      setInitialGym(data.data[0]); // Set the first gym as the initial gym
      setCurrentLocation({ latitude, longitude });
    }
  };

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
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Find gyms near your location
      </Typography>

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
      />

      <Button onClick={searchHandler} variant="contained" color="primary">
        Search
      </Button>

      <GymMap
        gyms={gyms}
        center={center}
        initialGym={initialGym} // Pass the initial gym to the map
        onMarkerClick={handleMarkerClick} // Rename prop to onMarkerClick
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBkA1fdPi5_I43IVxS4Zlw57iUrwlGdBv8&libraries=places`} // Replace YOUR_API_KEY with your actual API key
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Container>
  );
};

export default NearByGym;
