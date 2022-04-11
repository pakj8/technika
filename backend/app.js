const express = require('express');
const app = express();
const errorMiddleWare = require('./middleWare/error')
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());

// Route Imports
const users = require('./routes/userRoutes');
const events = require('./routes/eventRoutes');
const members = require('./routes/memberRoutes');

app.use('/api/v1',users);
app.use('/api/v1',events);
app.use('/api/v1',members);

// MiddleWare from error
app.use(errorMiddleWare)

module.exports = app;