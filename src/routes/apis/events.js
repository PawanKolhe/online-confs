const axios = require('axios');
const express = require("express");
const router = express.Router();

const events_api_url = 'https://dev.events/api/events/search?continent=ON&sorting=startDate';

// Get single member
router.get("/", (req, res) => {
  axios.get(events_api_url)
  .then(function (response) {
    let events = response.data[0];
    events = events.map(event => {
      event.start = event.startDate;
      event.end = event.endDate;
      return event;
    });
    res.json(events);
  });
});

module.exports = router;
