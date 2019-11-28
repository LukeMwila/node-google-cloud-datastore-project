// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
const teamRoutes = require('./routes/team');

// Routes which should handle requests
app.use('/v1/teams', teamRoutes);

// Server
const port = process.env.PORT || 3002;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
