const express = require('express');
const app = express();
const sdk = require('@fsq-developer/v1.0#78iknmrc2aljgfbp90');


sdk.auth('fsq3mi67FjDcRIEQD8R528NyLFX6jboL7tu7+Jgx08jBpfQ=');

app.get('/api/gyms', async (req, res) => {
  const { latitude, longitude } = req.query;

  sdk.placesNearby({ ll: `${latitude},${longitude}`, query: 'gym' })
    .then(({ data }) => {
      const gyms = data.response.venues.map(venue => ({
        id: venue.id,
        name: venue.name,
        latitude: venue.location.lat,
        longitude: venue.location.lng
      }));
      res.json(gyms);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching gym data.' });
    });
});