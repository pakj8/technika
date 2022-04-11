const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary");

// unCaught Exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unHandled Promise Rejection');
    process.exit(1);
});

// config
dotenv.config({path: 'backend/config/config.env'})

// connect database
const connectDatabase = require('./config/database')
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server running on PORT ${process.env.PORT}`);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// unHandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unHandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});