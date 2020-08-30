const express = require("express");
const path = require("path");
const logger = require("./middleware/logger").logger;

// Create Express server
const app = express();

// EXPRESS CONFIG
// Set port
const POST = process.env.PORT || 5000;
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// app.use(logger);
app.use('/api/events', require('./routes/apis/events'));

// Start server
app.listen(POST, () =>
  console.log(`Server is running.\nhttp://localhost:${POST}`)
);
