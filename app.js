const express = require('express');
const mentorRouter = require('./Routers/mentorRouter');
const studentRouter = require('./Routers/studentRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Create an Express application
const app = express();

// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Use the Express middleware to parse JSON
app.use(express.json());

// Use the cookie parser middleware
app.use(cookieParser());

// Use the routers
app.use('/mentor', mentorRouter);
app.use('/student', studentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Export the Express application
module.exports = app;
